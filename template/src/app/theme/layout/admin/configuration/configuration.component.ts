import {Component, NgZone, OnInit, ViewEncapsulation} from '@angular/core';
import {NextConfig} from '../../../../app-config';
import {Location} from '@angular/common';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationComponent implements OnInit {
  public styleSelectorToggle: boolean; // open configuration menu
  public layoutType: string; // layout type
  public rtlLayout: any; // rtl type
  public menuFixedLayout: any; // menu/navbar fixed flag
  public headerFixedLayout: any; // header fixed flag
  public boxLayout: any; // box layout flag
  public headerBackgroundColor: string; // header background color
  public brandBackgroundColor: string; // brand/logo background color

  public headerBackColor: string;

  public flatConfig: any;
  public isConfig: boolean;

  scroll = (): void => {
    if (this.headerFixedLayout === false) {
      (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = 'calc(100vh)';
      const el = document.querySelector('.pcoded-navbar.menupos-fixed') as HTMLElement;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 56) {
        el.style.position = 'fixed';
        el.style.transition = 'none';
        el.style.marginTop = '0';
      } else {
        el.style.position = 'absolute';
        el.style.marginTop = '56px';
      }
    } else if (document.querySelector('.pcoded-navbar').hasAttribute('style')) {
      document.querySelector('.pcoded-navbar.menupos-fixed').removeAttribute('style');
    }
  }

  constructor(private zone: NgZone, private location: Location) {
    this.flatConfig = NextConfig.config;
    this.setThemeLayout();
  }

  ngOnInit() {
    this.styleSelectorToggle = false;

    this.layoutType =  this.flatConfig.layoutType;
    this.setLayout(this.layoutType);

    this.headerBackgroundColor = this.flatConfig.headerBackColor;

    this.setHeaderBackground(this.headerBackgroundColor);

    this.rtlLayout = this.flatConfig.rtlLayout;
    this.changeRtlLayout(this.rtlLayout);

    this.menuFixedLayout = this.flatConfig.navFixedLayout;
    if (this.flatConfig.layout === 'vertical') {
      this.changeMenuFixedLayout(this.menuFixedLayout);
    }

    this.headerFixedLayout = this.flatConfig.headerFixedLayout;
    this.changeHeaderFixedLayout(this.headerFixedLayout);

    this.boxLayout = this.flatConfig.boxLayout;
    this.changeBoxLayout(this.boxLayout);
  }

  setThemeLayout() {
    let currentURL = this.location.path();
    const baseHref = this.location['_baseHref'];
    if (baseHref) {
      currentURL = baseHref + this.location.path();
    }

    if (currentURL.includes('?_ga=')) {
      currentURL = (currentURL.split('?_ga=', 1))[0];
    }

    switch (currentURL) {
      case baseHref + '/layout/static':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.navFixedLayout = false;
        this.flatConfig.headerFixedLayout = false;
        break;
      case baseHref + '/layout/fixed':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.navFixedLayout = true;
        this.flatConfig.headerFixedLayout = true;
        break;
      case baseHref + '/layout/nav-fixed':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.navFixedLayout = true;
        this.flatConfig.headerFixedLayout = false;
        break;
      case baseHref + '/layout/collapse-menu':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.collapseMenu = true;
        break;
      case baseHref + '/layout/vertical-rtl':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.rtlLayout = true;
        break;
      case baseHref + '/layout/horizontal':
        this.flatConfig.layout = 'horizontal';
        this.flatConfig.navFixedLayout = false;
        this.flatConfig.headerFixedLayout = false;
        break;
      case baseHref + '/layout/horizontal-l2':
        this.flatConfig.layout = 'horizontal';
        this.flatConfig.subLayout = 'horizontal-2';
        this.flatConfig.navFixedLayout = false;
        this.flatConfig.headerFixedLayout = false;
        break;
      case baseHref + '/layout/horizontal-rtl':
        this.flatConfig.layout = 'horizontal';
        this.flatConfig.subLayout = 'horizontal-2';
        this.flatConfig.navFixedLayout = false;
        this.flatConfig.headerFixedLayout = false;
        this.flatConfig.rtlLayout = true;
        break;
      case baseHref + '/layout/box':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.boxLayout = true;
        this.flatConfig.headerFixedLayout = false;
        this.flatConfig.collapseMenu = true;
        break;
      case baseHref + '/layout/light':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.layoutType = 'menu-light';
        this.flatConfig.headerBackColor = 'header-dark';
        break;
      case baseHref + '/layout/dark':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.layoutType = 'dark';
        this.flatConfig.headerBackColor = 'header-blue';
        break;
      case baseHref + '/layout/nav-color':
        this.flatConfig.layout = 'vertical';
        this.flatConfig.layoutType = 'menu-light';
        this.flatConfig.headerBackColor = 'header-info';
        this.flatConfig.navFixedLayout = true;
        this.flatConfig.headerFixedLayout = true;
        break;
      default:
        break;
    }
  }

  setHeaderBackColor(color) {
    this.headerBackColor = color;
    (document.querySelector('body') as HTMLElement).style.background = color;
  }

  // change main layout
  setLayout(layout) {
    this.isConfig = true;
    document.querySelector('.pcoded-navbar').classList.remove('menu-light');
    document.querySelector('.pcoded-navbar').classList.remove('menu-dark');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-dark');
    document.querySelector('body').classList.remove('flat-able-dark');

    this.layoutType = layout;
    if (layout === 'menu-light') {
      document.querySelector('.pcoded-navbar').classList.add(layout);
    }
    if (layout === 'dark') {
      document.querySelector('.pcoded-navbar').classList.add('navbar-dark');

      this.setHeaderBackground('header-dark');

      document.querySelector('body').classList.add('flat-able-dark');
    }
    if (layout === 'reset') {
      this.reset();
    }
  }

  reset() {
    document.querySelector('.pcoded-navbar').classList.remove('icon-colored');
    this.ngOnInit();
  }

  setRtlLayout(e) {
    const flag = !!(e.target.checked);
    this.changeRtlLayout(flag);
  }

  changeRtlLayout(flag) {
    if (flag) {
      document.querySelector('body').classList.add('flat-able-rtl');
    } else {
      document.querySelector('body').classList.remove('flat-able-rtl');
    }
  }

  setMenuFixedLayout(e) {
    const flag = !!(e.target.checked);
    this.changeMenuFixedLayout(flag);
  }

  changeMenuFixedLayout(flag) {
    setTimeout(() => {
      if (flag) {
        document.querySelector('.pcoded-navbar').classList.remove('menupos-static');
        document.querySelector('.pcoded-navbar').classList.add('menupos-fixed');
        if (this.flatConfig.layout === 'vertical') {
          (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = 'calc(100vh - 56px)'; // calc(100vh - 70px) amit
        }
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      } else {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        document.querySelector('.pcoded-navbar').classList.remove('menupos-fixed');
        if (this.flatConfig.layout === 'vertical') {
          (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = 'calc(100%)'; // calc(100% - 70px) amit
        }
        if (this.flatConfig.layout === 'vertical') {
          window.removeEventListener('scroll', this.scroll, true);
        }

      }
    }, 100);
  }

  setHeaderFixedLayout(e) {
    const flag = !!(e.target.checked);
    this.changeHeaderFixedLayout(flag);
  }

  changeHeaderFixedLayout(flag) {
    if (flag) {
      document.querySelector('.pcoded-header').classList.add('headerpos-fixed');
    } else {
      document.querySelector('.pcoded-header').classList.remove('headerpos-fixed');
      // static
      if (this.flatConfig.layout === 'vertical' && this.menuFixedLayout) {
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      } else {
        window.removeEventListener('scroll', this.scroll, true);
      }
    }
  }

  setBoxLayout(e) {
    const flag = !!(e.target.checked);
    this.changeBoxLayout(flag);

  }

  changeBoxLayout(flag) {
    if (flag) {
      document.querySelector('body').classList.add('container');
      document.querySelector('body').classList.add('box-layout');
      this.flatConfig['box-layout'] = true;
    } else {
      document.querySelector('body').classList.remove('box-layout');
      document.querySelector('body').classList.remove('container');
      this.flatConfig['box-layout'] = false;
    }
  }

  setHeaderBackground(background) {
    this.headerBackgroundColor = background;
    this.flatConfig.headerBackColor = background;
    document.querySelector('.pcoded-header').classList.remove('header-blue');
    document.querySelector('.pcoded-header').classList.remove('header-red');
    document.querySelector('.pcoded-header').classList.remove('header-purple');
    document.querySelector('.pcoded-header').classList.remove('header-info');
    document.querySelector('.pcoded-header').classList.remove('header-green');
    document.querySelector('.pcoded-header').classList.remove('header-dark');

    document.querySelector('.pcoded-header').classList.add(background);

  }

}
