import colorPalette from './colorPalette';

export default {
  // -------- Colors -----------
  ...colorPalette,
  white: '#fff',
  black: '#000',

  'primary-color': colorPalette['blue-base'],
  'primary-color-active': '#2E5BFF',
  'info-color': '#00AFFF',
  'success-color': '#1AA053',
  'error-color': '#EE0869',
  'critical-color': '#FE0000',
  'warning-color': colorPalette['yellow-base'],
  'normal-color': '#d9d9d9',
  'background-color-light': '#FAFAFA',
  'disabled-color': '@white',
  'disabled-bg': '#BFC5D2',
  'highlight-color': '#EE0869',

  // Background color for `<body>`
  'body-background': '#FBFCFF',
  // Base background color for most components
  'component-background': 'rgba(224, 231, 255, 0.2)',
  // Popover background color
  'popover-background': '@white',
  'font-family': 'DM Sans, serif',
  'text-color': '#2E384D',
  'text-color-secondary': '#677F9B',
  'heading-color': '#2E384D',
  'icon-color': colorPalette['gray-5'],
  'icon-color-hover': 'fade(@primary-color, 75%)',
  'font-size-base': '15px',
  'font-size-md': '14px',
  'font-size-sm': '12px',
  'font-size-xs': '10px',
  'line-height-base': '1.5714',

  'border-radius-base': '8px',
  'border-radius-sm': '2px',
  'border-radius-lg': '12px',

  // Height rules
  'height-base': '38px',
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
  'heading-5-size': '15px',

  // LINK
  'link-color': colorPalette['purple-base'],
  'link-hover-color': 'rgba(@link-color, 0.8)',
  'link-active-color': '#2E5BFF',
  'link-decoration': 'none',
  'link-hover-decoration': 'none',
  'link-focus-decoration': 'none',
  'link-focus-outline': '0',

  // Shadow
  'shadow-color': 'rgba(46, 91, 255, 0.15)',
  'box-shadow-base': '0px 4px 10px rgba(46, 91, 255, 0.15)',

  // Popover
  // ---
  // Popover body background color
  'popover-bg': '@white',

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

  // Border color
  'border-color-base': '#E0E7FF', // base border outline a component
  'border-width-base': '1px', // width of the border for a component
  'border-style-base': 'solid', // style of a components border
  'border-color-split': '@border-color-base', // split border inside a component
  'border-color-inverse': '@white',

  // Menu
  // ---
  'menu-inline-toplevel-item-height': '48px',
  'menu-item-height': '48px',
  'menu-item-group-height': '@line-height-base',
  'menu-collapsed-width': '80px',
  'menu-highlight-color': '@link-active-color',
  'menu-bg': '#191919',
  'menu-item-active-bg': '#FFFFFF',
  'menu-dark-bg': '#191919',
  'menu-item-active-border-width': '3px',
  // Dark theme
  'menu-dark-selected-item-text-color': '@link-active-color',

  // Table
  'table-header-bg': '@white',
  'table-bg': '@white',
  'table-even-bg': '@gray-0',
  'table-padding-vertical': '16px',
  'table-padding-horizontal': '24px',
  'table-border-radius-base': '@border-radius-base',
  'table-row-hover-bg': '#F5F6FD',
  'table-border-color': '@gray-2',
  'table-row-hover-bg': '#F5F6FD',
  'table-selected-row-bg': '@white',

  // Breadcrumb
  // ---
  'breadcrumb-base-color': '@link-color',
  'breadcrumb-last-item-color': '@text-color',
  'breadcrumb-font-size': '@font-size-base',
  'breadcrumb-icon-font-size': '@font-size-base',
  'breadcrumb-link-color': '@link-color',
  'breadcrumb-link-color-hover': '@link-hover-color',
  'breadcrumb-separator-color': '@text-color',
  'breadcrumb-separator-margin': '0 @padding-xs',

  // Divider
  'divider-text-padding': '1em',
  'divider-orientation-margin': '5%',
  'divider-color': '@gray-2',
  'divider-vertical-gutter': '8px',

  // Checkbox
  'checkbox-size': '20px',

  // Layout
  'layout-body-background': '#FBFCFF',
  'layout-header-background': '#191919',
  'layout-header-height': '64px',
  'layout-header-padding': '0 50px',
  'layout-header-color': '@text-color',
  'layout-footer-padding': '24px 50px',
  'layout-footer-background': '#fff',
  'layout-sider-background': '@layout-header-background',
  'layout-trigger-height': '48px',
  'layout-trigger-background': '#191919',
  'layout-trigger-color': '#fff',
  'layout-zero-trigger-width': '36px',
  'layout-zero-trigger-height': '48px',
  // Layout light theme
  'layout-sider-background-light': '@layout-header-background',
  'layout-trigger-background-light': '@layout-header-background',

  // PageHeader
  // ---
  'page-header-padding': '@padding-lg',
  'page-header-padding-vertical': '@padding-md',
  'page-header-padding-breadcrumb': '@padding-sm',
  'page-header-content-padding-vertical': '@padding-sm',
  'page-header-back-color': '#000',
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
  'card-radius': '@border-radius-lg',
  'card-head-tabs-margin-bottom': '-17px',
  'card-head-extra-color': '@text-color',

  // Drawer
  // ---
  'drawer-header-padding': '32px 32px 16px 32px',
  // 'drawer-body-padding': '@padding-lg',
  'drawer-bg': '@white',
  // 'drawer-footer-padding-vertical': '@modal-footer-padding-vertical',
  // 'drawer-footer-padding-horizontal': '@modal-footer-padding-horizontal',
  // 'drawer-header-close-size': '56px',
  'drawer-title-font-size': '20px',
  'drawer-title-line-height': '@line-height-base',

  // Modal
  // --
  'modal-mask-bg': 'rgba(47, 47, 47, 0.9)',
  'modal-header-bg': '@white',
  'modal-content-bg': '@white',

  // Tabs
  // ---
  'tabs-card-height': '52px',
  'tabs-ink-bar-color': '@primary-color',
  'tabs-card-active-color': '@text-color',
  'tabs-card-horizontal-padding': '20px',
  'tabs-title-font-size': '16px',
  'tabs-title-font-size-lg': '18px',
  'tabs-title-font-size-sm': '@font-size-sm',
  'tabs-highlight-color': '@text-color',
  'tabs-hover-color': '@text-color',
  'tabs-active-color': '@text-color',

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

  // Neutral color palette
  'gray-1': 'var(--gray-1)',
  'gray-2': 'var(--gray-2)',
  'gray-3': 'var(--gray-3)',
  'gray-4': 'var(--gray-4)',
  'gray-5': 'var(--gray-5)',
  'gray-6': 'var(--gray-6)',
  'gray-7': 'var(--gray-7)',
  'gray-8': 'var(--gray-8)',
  'gray-9': 'var(--gray-9)',

  // Input
  'input-height-base': '@height-base',
  'input-height-lg': '@height-lg',
  'input-height-sm': '@height-sm',
  'input-placeholder-color': '@gray-5',
  'input-color': '@text-color',
  'input-icon-color': '@icon-color',
  'input-border-color': '@border-color-base',
  'input-bg': 'rgba(224, 231, 255, 0.2)',

  // Select
  // ---
  'select-border-color': '@gray-3',
  'select-dropdown-bg': '@white',
  'select-item-selected-bg': '@purple-2',
  'select-item-selected-color': '@white',
  'select-single-item-height-lg': '@height-lg',

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
  'segmented-selected-bg': '@primary-color',
  'segmented-label-color': 'fade(@black, 65%)',
  'segmented-label-hover-color': '#262626',

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

  // Buttons
  'btn-default-color': '#8798AD',
  // 'btn-default-bg':'#8798AD',
  'btn-default-border': '#8798AD',

  // Tooltip
  // ---
  // Tooltip max width
  'tooltip-max-width': '250px',
  // Tooltip text color
  'tooltip-color': '@white',
  // Tooltip background color
  'tooltip-bg': '#141736',
  // Tooltip arrow width
  'tooltip-arrow-width': '8px * sqrt(2)',
  // Tooltip distance with trigger
  'tooltip-distance': '@tooltip-arrow-width - 1px + 4px',
  // Tooltip arrow color
  'tooltip-arrow-color': '@tooltip-bg',
  'tooltip-border-radius': '@border-radius-base',

  'page-footer-height': '96px',
};
