import colorPalette from './colorPalette';

export default {
  // -------- Colors -----------
  ...colorPalette,
  white: '#fff',
  black: '#000',

  'primary-color': colorPalette['purple-base'],
  'info-color': '#00AFFF',
  'success-color': '#1AA053',
  'error-color': '#EE0869',
  'critical-color': '#B42318',
  'warning-color': '#DFA22F',
  'normal-color': '#d9d9d9',
  'background-color-light': '#FAFAFA',
  'disabled-color': '#00000020',
  'disabled-bg': '#F5F5F5',
  'highlight-color': '#EE0869',

  // Background color for <body>
  'body-background': '@white',
  // Base background color for most components
  'component-background': '@white',
  // Popover background color
  'popover-background': '@white',
  'font-family': 'Inter, sans-serif',
  'text-color': colorPalette['gray-7'],
  'text-color-secondary': colorPalette['gray-5'],
  'text-color-dark': 'fade(@white, 85%)',
  'text-color-secondary-dark': 'fade(@white, 65%)',
  'heading-color': colorPalette['gray-9'],
  'icon-color': 'currentColor',
  'icon-color-hover': 'fade(@primary-color, 75%)',
  'font-size-base': '14px',
  'font-size-md': '14px',
  'font-size-sm': '12px',
  'font-size-xs': '10px',
  'line-height-base': '1.5714',

  'border-radius-base': '8px',
  'border-radius-sm': '4px',
  'border-radius-lg': '16px',

  // Height rules
  'height-base': '40px',
  'height-lg': '48px',
  'height-sm': '24px',

  // vertical paddings
  'padding-xl': '58px', // containers
  'padding-sxl': '32px', // containers
  'padding-lg': '24px', // containers
  'padding-md': '16px', // small containers and buttons
  'padding-sm': '12px', // Form controls and items
  'padding-xs': '8px', // small items
  'padding-xss': '4px', // more small

  // vertical margins
  'margin-xl': '58px', // containers
  'margin-lg': '24px', // containers
  'margin-md': '16px', // small containers and buttons
  'margin-sm': '12px', // Form controls and items
  'margin-xs': '8px', // small items
  'margin-xss': '4px', // more small

  // Typography
  // ---
  'typography-title-font-weight': '500',
  'typography-title-margin-top': '0px',
  'typography-title-margin-bottom': '0.5em',
  'typography-title-font-weight-semi': '600',
  'fw-600': '600',
  'fw-700': '700',
  'fw-500': '500',

  'heading-1-size': '34px',
  'heading-2-size': '28px',
  'heading-3-size': '22px',
  'heading-4-size': '18px',
  'heading-5-size': '16px',
  'heading-6-size': '14px',

  // LINK
  'link-color': '@primary-color',
  'link-hover-color': 'rgba(@link-color, 0.8)',
  'link-active-color': '#2E5BFF',
  'link-decoration': 'none',
  'link-hover-decoration': 'none',
  'link-focus-decoration': 'none',
  'link-focus-outline': '0',

  // Shadow
  'shadow-color': 'rgba(16, 24, 40, 0.05)',
  'box-shadow-base': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  'box-shadow-md': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',

  // Popover
  // ---
  // Popover body background color
  'popover-bg': '@white',
  // Popover text color
  'popover-color': '@text-color',
  // Popover maximum width
  'popover-min-width': '177px',
  'popover-min-height': '32px',
  // Popover arrow width
  'popover-arrow-width': '@tooltip-arrow-width',
  // Popover arrow color
  'popover-arrow-color': '@popover-bg',
  // Popover outer arrow width
  // Popover outer arrow color
  'popover-arrow-outer-color': '@popover-bg',
  // Popover distance with trigger
  'popover-distance': '8px',
  'popover-padding-horizontal': '0',


  // buttons
  'btn-padding-horizontal-lg': '@padding-lg',
  'btn-font-size': '14px',
  'btn-font-size-sm': '14px',
  'btn-font-size-lg': '14px',
  'btn-font-weight': '500',
  'btn-border-radius-base': '@border-radius-base',
  'btn-default-border': '@gray-3',
  'btn-default-color': '@gray-7',

  'btn-disable-color': '@disabled-color',
  'btn-disable-bg': '@disabled-bg',
  'btn-disable-border': '@border-color-base',

  'btn-ghost-color': '@primary-color',
  'btn-ghost-bg': '@blue-0',
  'btn-ghost-border': '@primary-color',

  // Radio
  'radio-size': '20px',
  'radio-top': '0.4em',
  'radio-border-width': '1px',
  'radio-dot-size': '@radio-size - 8px',
  'radio-dot-color': '@primary-color',
  'radio-dot-disabled-color': 'fade(@black, 20%)',
  'radio-solid-checked-color': '@primary-4',

  // Radio button,
  // 'radio-button-bg': '@btn-default-bg',
  // 'radio-button-checked-bg': '@btn-default-bg',
  // 'radio-button-color': '@btn-default-color',
  // 'radio-button-hover-color': '@primary-5',
  'radio-button-active-color': '@primary-7',
  'radio-button-padding-horizontal': '@padding-md - 1px',
  // 'radio-disabled-button-checked-bg': '@disabled-active-bg',
  'radio-disabled-button-checked-color': '@disabled-color',
  'radio-wrapper-margin-right': '8px',

  // Border color
  'border-color-base': colorPalette['gray-2'], // base border outline a component
  'border-width-base': '1px', // width of the border for a component
  'border-style-base': 'solid', // style of a components border
  'border-color-split': '@border-color-base', // split border inside a component
  'border-color-inverse': '@white',

  // Menu
  // ---
  'menu-item-font-size': '@font-size-md',
  'ant-pro-menu-item-title': '14px',
  'menu-inline-toplevel-item-height': '40px',
  'menu-item-height': '40px',
  'menu-item-group-height': '@line-height-base',
  'menu-collapsed-width': '80px',
  'menu-highlight-color': '@link-active-color',
  'menu-bg': colorPalette['gray-5'],
  'menu-item-active-bg': '#FFFFFF',
  'menu-item-active-border-width': '0px',

  // Dark theme
  'menu-dark-color': '@text-color-secondary-dark',
  'menu-dark-danger-color': '@error-color',
  'menu-dark-bg': '@primary-color',
  'menu-dark-arrow-color': '#fff',
  'menu-dark-inline-submenu-bg': 'transparent',
  'menu-dark-highlight-color': '#fff',
  'menu-dark-item-active-bg': 'transparent',
  // 'menu-dark-item-active-bg': colorPalette['purple-7'],
  'menu-dark-item-active-danger-bg': '@error-color',
  'menu-dark-selected-item-icon-color': '@white',
  'menu-dark-selected-item-text-color': '@white',
  'menu-dark-item-hover-bg': 'transparent',

  // Collapse
  // ---
  'collapse-header-padding': '@padding-sm @padding-md',
  'collapse-header-padding-extra': '40px',
  'collapse-header-bg': '@background-color-light',
  'collapse-content-padding': ' @padding-md',
  'collapse-content-bg': '@component-background',
  'collapse-header-arrow-left': '16px',

  // Table
  'table-header-bg': '@white',
  'table-header-sort-bg': 'transparent',
  'table-bg': '@white',
  'table-header-color': '@text-color-secondary',
  'table-even-bg': '@gray-0',
  'table-padding-vertical': '16px',
  'table-padding-horizontal': '24px',
  'table-border-radius-base': '@border-radius-base',
  'table-border-color': '@gray-2',
  'table-row-hover-bg': '#F5F6FD',
  'table-body-sort-bg': 'transparent',

  'table-selected-row-bg': '@white',

  // Breadcrumb
  // ---
  'breadcrumb-base-color': '#667085',
  'breadcrumb-last-item-color': '@text-color',
  'breadcrumb-font-size': '@font-size-sm',
  'breadcrumb-icon-font-size': '16px',
  'breadcrumb-link-color': '@link-color',
  'breadcrumb-link-color-hover': '@link-hover-color',
  'breadcrumb-separator-color': '@gray-3',
  'breadcrumb-separator-margin': '0 @padding-md',

  // Divider
  'divider-text-padding': '1em',
  'divider-orientation-margin': '5%',
  'divider-color': '@gray-2',
  'divider-vertical-gutter': '8px',

  // Checkbox
  'checkbox-size': '20px',
  'checkbox-border-radius': '@border-radius-sm',

  // Layout
  'layout-body-background': '#F5F5F5',
  'layout-header-background': '#F5F5F5',
  'layout-footer-background': '#fff',
  'layout-header-height': '80px',
  'layout-header-padding': '32px',
  'layout-header-color': '@text-color',
  'layout-footer-padding': '24px 50px',
  'layout-sider-background': '@primary-color',
  'layout-trigger-height': '40px',
  'layout-trigger-background': colorPalette['purple-7'],
  'layout-trigger-color': '#fff',
  'layout-zero-trigger-width': '36px',
  'layout-zero-trigger-height': '40px',
  // Layout light theme
  'layout-sider-background-light': '@primary-color',
  // 'layout-trigger-background-light': '@layout-header-background',
  'layout-trigger-background-light': '@primary-color',
  'layout-trigger-color-light': colorPalette['purple-7'],

  // PageHeader
  // ---
  'page-header-padding': '@padding-lg',
  'page-header-padding-vertical': '@padding-md',
  'page-header-padding-breadcrumb': '@padding-sm',
  'page-header-content-padding-vertical': '@padding-sm',
  'page-header-back-color': '@white',
  'page-header-ghost-bg': 'inherit',
  'page-header-heading-title': '@heading-4-size',
  'page-header-heading-sub-title': '14px',
  'page-header-tabs-tab-font-size': '16px',

  // Card
  // ---
  'card-head-color': '@heading-color',
  'card-head-background': 'transparent',
  'card-head-font-size': '20px',
  'card-head-font-size-sm': '@font-size-base',
  'card-head-padding': '16px',
  'card-head-padding-sm': '(@card-head-padding / 2)',
  'card-head-height': ' 48px',
  'card-head-height-sm': '36px',
  'card-inner-head-padding': '12px',
  'card-padding-base': '24px',
  'card-padding-base-sm': '(@card-padding-base / 2)',
  'card-actions-background': '@white',
  'card-actions-li-margin': '12px 0',
  'card-skeleton-bg': '#cfd8dc',
  'card-background': '@white',
  'card-shadow':
    '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),    0 5px 12px 4px rgba(0, 0, 0, 0.09)',
  'card-radius': '@border-radius-base',
  'card-head-tabs-margin-bottom': '-17px',
  'card-head-extra-color': '@text-color',

  // Drawer
  // ---
  'drawer-header-padding': '32px 32px 16px 32px',
  // 'drawer-body-padding': '@padding-lg',
  'drawer-bg': '@white',
  'drawer-footer-padding-vertical': '@padding-lg',
  // 'drawer-footer-padding-horizontal': '@modal-footer-padding-horizontal',
  // 'drawer-header-close-size': '56px',
  'drawer-title-font-size': '20px',
  'drawer-title-line-height': '@line-height-base',

  // Modal
  // --
  'modal-mask-bg': 'rgba(52, 64, 84, 0.7)',
  'modal-header-bg': '@white',
  'modal-content-bg': '@white',

  // Tabs
  // ---
  'tabs-card-height': '36px',
  'tabs-ink-bar-color': '@primary-color',
  'tabs-card-active-color': '@text-color',
  'tabs-card-horizontal-padding': '8px',
  'tabs-horizontal-padding': '12px',
  'tabs-horizontal-padding-lg': '1rem',
  'tabs-horizontal-padding-sm': '12px',
  'tabs-horizontal-gutter': '16px',
  'tabs-title-font-size': '@font-size-base',
  'tabs-title-font-size-lg': '18px',
  'tabs-title-font-size-sm': '@font-size-sm',
  'tabs-highlight-color': '@primary-color',
  'tabs-hover-color': colorPalette['purple-6'],
  'tabs-active-color': '@primary-color',

  // Statistic
  // ---
  'statistic-title-font-size': '@font-size-base',
  'statistic-content-font-size': '24px',
  'statistic-unit-font-size': '14px',
  'statistic-font-family': '@font-family',

  // btn-tag
  'btn-tag-height': '26px',
  'btn-tag-border-radius': '13px',
  'btn-hover-color': '#1C8F97',

  // Avatar
  'avatar-bg': '#E6ECFF',

  // Switch
  // ---
  'switch-height': '22px',
  'switch-sm-height': '16px',
  'switch-min-width': '44px',
  'switch-sm-min-width': '28px',
  'switch-disabled-opacity': '1',
  // 'switch-color': '@primary-color',
  'switch-color': 'currentColor',
  'switch-bg': '@white',
  'switch-shadow-color': 'fade(#00230b, 20%)',
  'switch-padding': '2px',
  'switch-inner-margin-min': 'ceil(@switch-height * 0.3)',
  'switch-inner-margin-max': 'ceil(@switch-height * 1.1)',
  'switch-sm-inner-margin-min': 'ceil(@switch-sm-height * 0.3)',
  'switch-sm-inner-margin-max': 'ceil(@switch-sm-height * 1.1)',

  // Media queries breakpoints
  'screen-sm': '576px',
  'screen-md': '768px',
  'screen-lg': '992px',
  'screen-xl': '1200px',
  'screen-xxl': '1400px',

  // Input
  'input-height-base': '@height-base',
  'input-height-lg': '@height-lg',
  'input-height-sm': '@height-sm',
  'input-placeholder-color': '@gray-5',
  'input-color': '@gray-9',
  'input-icon-color': '@gray-5',
  'input-border-color': '@border-color-base',
  'input-bg': '@white',
  'input-disabled-bg': '@disabled-bg',

  // Select
  'select-border-color': '@gray-3',
  'select-dropdown-bg': '@white',
  'select-item-selected-bg': '@blue-3',
  'select-item-selected-color': '@white',
  'select-single-item-height-lg': '@height-lg',
  'select-background': '@input-bg',

  // Form
  // ---
  'label-required-color': '@highlight-color',
  'label-color': '@heading-color',
  'form-warning-input-bg': '@input-bg',
  'form-item-margin-bottom': '24px',
  'form-item-trailing-colon': 'true',
  'form-vertical-label-padding': '0 0 8px',
  'form-vertical-label-margin': '0',
  'form-item-label-font-size': '12px',
  'form-item-label-height': '16px',
  'form-item-label-colon-margin-right': '8px',
  'form-item-label-colon-margin-left': '2px',
  'form-error-input-bg': '@input-bg',

  // Calendar
  'calendar-item-active-bg': '@white',

  // TimePicker
  // ---
  'picker-bg': '@white',
  'picker-basic-cell-disabled-bg': 'rgba(0, 0, 0, 0.251)',

  //
  'item-active-bg': '@white',

  // Segmented
  // ---
  'segmented-bg': 'transparent',
  'segmented-hover-bg': 'transparent',
  'segmented-selected-bg': '@white',
  'segmented-label-color': 'fade(@primary-color, 65%)',
  'segmented-label-hover-color': '@primary-color',

  // Steps
  // ---
  'process-tail-color': '@border-color-split',
  'steps-nav-arrow-color': '@border-color-split',
  'steps-background': '@primary-color',

  // Notification
  // ---
  'notification-bg': '@white',
  'notification-padding-vertical': '16px',
  'notification-padding-horizontal': '24px',

  // Tooltip
  // ---
  // Tooltip max width
  'tooltip-max-width': '250px',
  // Tooltip text color
  'tooltip-color': '@text-color-secondary',
  // Tooltip background color
  'tooltip-bg': '@white',
  // Tooltip arrow width
  'tooltip-arrow-width': '8px * sqrt(2)',
  // Tooltip distance with trigger
  'tooltip-distance': '@tooltip-arrow-width - 1px + 4px',
  // Tooltip arrow color
  'tooltip-arrow-color': '@tooltip-bg',
  'tooltip-border-radius': '@border-radius-base',

  'page-footer-height': '96px',
};
