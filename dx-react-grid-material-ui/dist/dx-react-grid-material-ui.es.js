/**
 * Bundle of @devexpress/dx-react-grid-@material-ui/core
 * Generated: 2018-05-04
 * Version: 1.2.0
 * License: https://js.devexpress.com/Licensing
 */

import { PureComponent, createElement } from 'react';
import { any, arrayOf, bool, func, node, number, object, oneOf, oneOfType, shape, string } from 'prop-types';
import { ColumnChooser, DragDropProvider, Grid, GroupPanelLayout, GroupingPanel, PagingPanel, SearchPanel, StaticTableLayout, Table, TableBandHeader, TableColumnReordering, TableColumnResizing, TableColumnVisibility, TableEditColumn, TableEditRow, TableFilterRow, TableGroupRow, TableHeaderRow, TableLayout, TableRowDetail, TableSelection, TableTreeColumn, Toolbar, VirtualTableLayout } from '@devexpress/dx-react-grid';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { calculateStartPage, firstRowOnPage, lastRowOnPage } from '@devexpress/dx-grid-core';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { DragSource, Draggable, DropTarget, createRenderComponent } from '@devexpress/dx-react-core';
import List$1 from '@material-ui/icons/List';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar$1 from '@material-ui/core/Toolbar';
import Search from '@material-ui/icons/Search';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Root = function Root(_ref) {
  var children = _ref.children,
    restProps = objectWithoutProperties(_ref, ['children']);
  return createElement(
    'div',
    restProps,
    children
  );
};

Root.propTypes = {
  children: node
};

Root.defaultProps = {
  children: undefined
};

var Grid$1 = function Grid$$1(_ref) {
  var children = _ref.children,
    props = objectWithoutProperties(_ref, ['children']);
  return createElement(
    Grid,
    _extends({
      rootComponent: Root
    }, props),
    children
  );
};

Grid$1.Root = Root;

Grid$1.propTypes = {
  children: node.isRequired
};

var Overlay = function Overlay(_ref) {
  var visible = _ref.visible,
    onHide = _ref.onHide,
    children = _ref.children,
    target = _ref.target,
    restProps = objectWithoutProperties(_ref, ['visible', 'onHide', 'children', 'target']);
  return createElement(
    Popover,
    _extends({
      open: visible,
      anchorEl: target,
      onClose: onHide,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'right' }
    }, restProps),
    children
  );
};

Overlay.propTypes = {
  onHide: func.isRequired,
  children: node.isRequired,
  visible: bool,
  target: oneOfType([object, func])
};

Overlay.defaultProps = {
  visible: false,
  target: null
};

var Container = function Container(_ref) {
  var children = _ref.children,
    restProps = objectWithoutProperties(_ref, ['children']);
  return createElement(
    List,
    _extends({
      dense: true
    }, restProps),
    children
  );
};

Container.propTypes = {
  children: node.isRequired
};

var ToggleButton = function ToggleButton(_ref) {
  var onToggle = _ref.onToggle,
    getMessage = _ref.getMessage,
    buttonRef = _ref.buttonRef,
    active = _ref.active,
    restProps = objectWithoutProperties(_ref, ['onToggle', 'getMessage', 'buttonRef', 'active']);
  return createElement(
    Tooltip,
    _extends({
      title: getMessage('showColumnChooser'),
      placement: 'bottom',
      enterDelay: 300
    }, restProps),
    createElement(
      IconButton,
      {
        onClick: onToggle,
        buttonRef: buttonRef
      },
      createElement(VisibilityOff, null)
    )
  );
};

ToggleButton.propTypes = {
  onToggle: func.isRequired,
  getMessage: func.isRequired,
  buttonRef: func.isRequired,
  active: bool
};

ToggleButton.defaultProps = {
  active: false
};

var Item = function Item(_ref) {
  var _ref$item = _ref.item,
    column = _ref$item.column,
    hidden = _ref$item.hidden,
    disabled = _ref.disabled,
    onToggle = _ref.onToggle,
    restProps = objectWithoutProperties(_ref, ['item', 'disabled', 'onToggle']);
  return createElement(
    ListItem,
    _extends({
      key: column.name,
      button: !disabled,
      disabled: disabled,
      onClick: !disabled ? onToggle : null
    }, restProps),
    createElement(Checkbox, {
      checked: !hidden,
      tabIndex: -1,
      disableRipple: true,
      disabled: disabled,
      style: { width: 'auto', height: 'auto' }
    }),
    createElement(ListItemText, { primary: column.title || column.name })
  );
};

Item.propTypes = {
  item: shape({
    column: shape({
      name: string
    }),
    hidden: bool
  }).isRequired,
  disabled: bool,
  onToggle: func
};

Item.defaultProps = {
  onToggle: function onToggle() { },
  disabled: false
};

var defaultMessages = {
  showColumnChooser: 'Show Column Chooser'
};
var ColumnChooser$1 = function (_React$PureComponent) {
  inherits(ColumnChooser$$1, _React$PureComponent);

  function ColumnChooser$$1() {
    classCallCheck(this, ColumnChooser$$1);
    return possibleConstructorReturn(this, (ColumnChooser$$1.__proto__ || Object.getPrototypeOf(ColumnChooser$$1)).apply(this, arguments));
  }

  createClass(ColumnChooser$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);

      return createElement(ColumnChooser, _extends({
        overlayComponent: Overlay,
        containerComponent: Container,
        toggleButtonComponent: ToggleButton,
        itemComponent: Item,
        messages: _extends({}, defaultMessages, messages)
      }, restProps));
    }
  }]);
  return ColumnChooser$$1;
}(PureComponent);

ColumnChooser$1.Container = Container;
ColumnChooser$1.ToggleButton = ToggleButton;
ColumnChooser$1.Item = Item;
ColumnChooser$1.Overlay = Overlay;

ColumnChooser$1.propTypes = {
  messages: shape({
    hiddenColumnNames: string
  })
};

ColumnChooser$1.defaultProps = {
  messages: {}
};

var styles$1 = function styles$$1(theme) {
  return {
    container: {
      position: 'fixed',
      zIndex: 1000,
      left: 0,
      top: 0,
      display: 'inline-block'
    },
    column: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      float: 'right',
      cursor: 'move'
    }
  };
};

var ContainerBase = function ContainerBase(_ref) {
  var clientOffset = _ref.clientOffset,
    classes = _ref.classes,
    style = _ref.style,
    className = _ref.className,
    children = _ref.children,
    restProps = objectWithoutProperties(_ref, ['clientOffset', 'classes', 'style', 'className', 'children']);
  return createElement(
    'div',
    _extends({
      className: classNames(classes.container, className),
      style: _extends({
        transform: 'translate(calc(' + clientOffset.x + 'px - 50%), calc(' + clientOffset.y + 'px - 50%))'
      }, style)
    }, restProps),
    children
  );
};

ContainerBase.propTypes = {
  clientOffset: shape({
    x: number.isRequired,
    y: number.isRequired
  }).isRequired,
  children: node,
  classes: object.isRequired,
  style: object,
  className: string
};

ContainerBase.defaultProps = {
  style: null,
  className: undefined,
  children: undefined
};

var Container$1 = withStyles(styles$1, { name: 'DragDrop' })(ContainerBase);

var ColumnBase = function ColumnBase(_ref2) {
  var column = _ref2.column,
    classes = _ref2.classes,
    className = _ref2.className,
    restProps = objectWithoutProperties(_ref2, ['column', 'classes', 'className']);
  return createElement(Chip, _extends({
    className: classNames(classes.column, className),
    label: column.title
  }, restProps));
};

ColumnBase.propTypes = {
  column: object.isRequired,
  classes: object.isRequired,
  className: string
};

ColumnBase.defaultProps = {
  className: undefined
};

var Column = withStyles(styles$1, { name: 'DragDrop' })(ColumnBase);

var DragDropProvider$1 = function (_React$PureComponent) {
  inherits(DragDropProvider$$1, _React$PureComponent);

  function DragDropProvider$$1() {
    classCallCheck(this, DragDropProvider$$1);
    return possibleConstructorReturn(this, (DragDropProvider$$1.__proto__ || Object.getPrototypeOf(DragDropProvider$$1)).apply(this, arguments));
  }

  createClass(DragDropProvider$$1, [{
    key: 'render',
    value: function render() {
      return createElement(DragDropProvider, _extends({
        containerComponent: Container$1,
        columnComponent: Column
      }, this.props));
    }
  }]);
  return DragDropProvider$$1;
}(PureComponent);

DragDropProvider$1.Container = Container$1;
DragDropProvider$1.Column = Column;

var styles$3 = function styles$$1(theme) {
  return {
    pageSizeSelector: _extends({}, theme.typography.caption, {
      float: 'right',
      paddingRight: theme.spacing.unit * 5
    }),
    label: {
      paddingRight: theme.spacing.unit * 3,
      lineHeight: theme.spacing.unit * 5 + 'px',
      float: 'left'
    },
    pageSizes: {
      display: 'inline-block'
    },
    pageSizeTitle: {
      width: 'auto',
      marginRight: theme.spacing.unit / 2
    },
    inputRoot: {
      paddingTop: theme.spacing.unit * 0.75,
      float: 'right',
      fontSize: theme.spacing.unit * 1.75,
      textAlign: 'right'
    },
    selectIcon: {
      top: 2
    },
    '@media (max-width: 768px)': {
      label: {
        display: 'none'
      },
      pageSizeSelector: {
        paddingRight: theme.spacing.unit * 2
      }
    }
  };
};

var PageSizeSelectorBase = function PageSizeSelectorBase(_ref) {
  var pageSize = _ref.pageSize,
    onPageSizeChange = _ref.onPageSizeChange,
    pageSizes = _ref.pageSizes,
    getMessage = _ref.getMessage,
    classes = _ref.classes;

  var showAll = getMessage('showAll');
  return createElement(
    'div',
    { className: classes.pageSizeSelector },
    createElement(
      'span',
      { className: classes.label },
      getMessage('rowsPerPage')
    ),
    createElement(
      Select,
      {
        value: pageSize,
        onChange: function onChange(event) {
          return onPageSizeChange(event.target.value);
        },
        classes: {
          icon: classes.selectIcon
        },
        input: createElement(Input, {
          disableUnderline: true,
          classes: { root: classes.inputRoot }
        })
      },
      pageSizes.map(function (item) {
        return createElement(
          MenuItem,
          { key: item, value: item },
          item !== 0 ? item : showAll
        );
      })
    )
  );
};

PageSizeSelectorBase.propTypes = {
  pageSize: number.isRequired,
  onPageSizeChange: func.isRequired,
  pageSizes: arrayOf(number).isRequired,
  classes: object.isRequired,
  getMessage: func.isRequired
};

var PageSizeSelector = withStyles(styles$3, { name: 'PageSizeSelector' })(PageSizeSelectorBase);

var styles$4 = function styles$$1(theme) {
  return {
    pagination: {
      float: 'right',
      margin: 0
    },
    rowsLabel: _extends({}, theme.typography.caption, {
      paddingRight: theme.spacing.unit * 5,
      lineHeight: theme.spacing.unit * 5 + 'px'
    }),
    button: {
      minWidth: theme.spacing.unit * 2,
      height: theme.spacing.unit * 5
    },
    activeButton: {
      fontWeight: 'bold',
      cursor: 'default'
    },
    arrowButton: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    prev: {
      marginRight: 0
    },
    next: {
      marginLeft: 0
    },
    '@media(max-width: 768px)': {
      button: {
        display: 'none'
      },
      prev: {
        marginRight: theme.spacing.unit
      },
      next: {
        marginLeft: theme.spacing.unit
      },
      rowsLabel: {
        paddingRight: theme.spacing.unit * 2
      }
    }
  };
};

var PageButton = function PageButton(_ref) {
  var _classNames;

  var text = _ref.text,
    isActive = _ref.isActive,
    isDisabled = _ref.isDisabled,
    classes = _ref.classes,
    onClick = _ref.onClick;

  var buttonClasses = classNames((_classNames = {}, defineProperty(_classNames, classes.button, true), defineProperty(_classNames, classes.activeButton, isActive), _classNames));

  return createElement(
    Button,
    {
      className: buttonClasses,
      disabled: isDisabled,
      onClick: onClick,
      disableRipple: isActive
    },
    text
  );
};

PageButton.propTypes = {
  text: string.isRequired,
  isActive: bool,
  isDisabled: bool,
  classes: object.isRequired,
  onClick: func
};

PageButton.defaultProps = {
  onClick: function onClick() { },
  isDisabled: false,
  isActive: false
};

var ellipsisSymbol = '\u2026';

var renderPageButtons = function renderPageButtons(currentPage, totalPageCount, classes, onCurrentPageChange) {
  var pageButtons = [];
  var maxButtonCount = 3;
  var startPage = 1;
  var endPage = totalPageCount || 1;

  if (maxButtonCount < totalPageCount) {
    startPage = calculateStartPage(currentPage + 1, maxButtonCount, totalPageCount);
    endPage = startPage + maxButtonCount - 1;
  }
  if (startPage > 1) {
    pageButtons.push(createElement(PageButton, {
      key: 1,
      text: String(1),
      classes: classes,
      onClick: function onClick() {
        return onCurrentPageChange(0);
      }
    }));

    if (startPage > 2) {
      pageButtons.push(createElement(PageButton, {
        key: 'ellipsisStart',
        text: ellipsisSymbol,
        classes: classes,
        isDisabled: true
      }));
    }
  }

  var _loop = function _loop(page) {
    pageButtons.push(createElement(PageButton, {
      key: page,
      text: String(page),
      isActive: page === currentPage + 1,
      classes: classes,
      onClick: function onClick() {
        return onCurrentPageChange(page - 1);
      },
      isDisabled: startPage === endPage
    }));
  };

  for (var page = startPage; page <= endPage; page += 1) {
    _loop(page);
  }

  if (endPage < totalPageCount) {
    if (endPage < totalPageCount - 1) {
      pageButtons.push(createElement(PageButton, {
        key: 'ellipsisEnd',
        text: ellipsisSymbol,
        classes: classes,
        isDisabled: true
      }));
    }

    pageButtons.push(createElement(PageButton, {
      key: totalPageCount,
      text: String(totalPageCount),
      classes: classes,
      onClick: function onClick() {
        return onCurrentPageChange(totalPageCount - 1);
      }
    }));
  }

  return pageButtons;
};

var PaginationBase = function PaginationBase(_ref2) {
  var totalPages = _ref2.totalPages,
    totalCount = _ref2.totalCount,
    pageSize = _ref2.pageSize,
    currentPage = _ref2.currentPage,
    onCurrentPageChange = _ref2.onCurrentPageChange,
    getMessage = _ref2.getMessage,
    classes = _ref2.classes;

  var from = firstRowOnPage(currentPage, pageSize, totalCount);
  var to = lastRowOnPage(currentPage, pageSize, totalCount);

  return createElement(
    'div',
    { className: classes.pagination },
    createElement(
      'span',
      { className: classes.rowsLabel },
      getMessage('info', { from: from, to: to, count: totalCount })
    ),
    createElement(
      IconButton,
      {
        className: classNames(classes.arrowButton, classes.prev),
        disabled: currentPage === 0,
        onClick: function onClick() {
          return currentPage > 0 && onCurrentPageChange(currentPage - 1);
        }
      },
      createElement(ChevronLeft, null)
    ),
    renderPageButtons(currentPage, totalPages, classes, onCurrentPageChange),
    createElement(
      IconButton,
      {
        className: classNames(classes.arrowButton, classes.next),
        disabled: currentPage === totalPages - 1 || totalCount === 0,
        onClick: function onClick() {
          return currentPage < totalPages - 1 && onCurrentPageChange(currentPage + 1);
        }
      },
      createElement(ChevronRight, null)
    )
  );
};

PaginationBase.propTypes = {
  totalPages: number.isRequired,
  currentPage: number.isRequired,
  onCurrentPageChange: func.isRequired,
  classes: object.isRequired,
  totalCount: number.isRequired,
  pageSize: number.isRequired,
  getMessage: func.isRequired
};

var Pagination = withStyles(styles$4, { name: 'Pagination' })(PaginationBase);

var styles$2 = function styles$$1(theme) {
  return {
    pager: {
      overflow: 'hidden',
      padding: theme.spacing.unit * 1.5
    }
  };
};

var PagerBase = function PagerBase(_ref) {
  var currentPage = _ref.currentPage,
    pageSizes = _ref.pageSizes,
    totalPages = _ref.totalPages,
    pageSize = _ref.pageSize,
    classes = _ref.classes,
    _onCurrentPageChange = _ref.onCurrentPageChange,
    onPageSizeChange = _ref.onPageSizeChange,
    totalCount = _ref.totalCount,
    getMessage = _ref.getMessage,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['currentPage', 'pageSizes', 'totalPages', 'pageSize', 'classes', 'onCurrentPageChange', 'onPageSizeChange', 'totalCount', 'getMessage', 'className']);
  return createElement(
    'div',
    _extends({
      className: classNames(classes.pager, className)
    }, restProps),
    createElement(Pagination, {
      totalPages: totalPages,
      totalCount: totalCount,
      currentPage: currentPage,
      onCurrentPageChange: function onCurrentPageChange(page) {
        return _onCurrentPageChange(page);
      },
      pageSize: pageSize,
      getMessage: getMessage
    }),
    !!pageSizes.length && createElement(PageSizeSelector, {
      pageSize: pageSize,
      onPageSizeChange: onPageSizeChange,
      pageSizes: pageSizes,
      getMessage: getMessage
    })
  );
};

PagerBase.propTypes = {
  currentPage: number.isRequired,
  totalPages: number.isRequired,
  pageSizes: arrayOf(number).isRequired,
  pageSize: number.isRequired,
  classes: object.isRequired,
  onCurrentPageChange: func.isRequired,
  onPageSizeChange: func.isRequired,
  totalCount: number.isRequired,
  getMessage: func.isRequired,
  className: string
};

PagerBase.defaultProps = {
  className: undefined
};

var Pager = withStyles(styles$2, { name: 'Pager' })(PagerBase);

var defaultMessages$1 = {
  showAll: 'All',
  rowsPerPage: 'Rows per page:',
  info: function info(_ref) {
    var from = _ref.from,
      to = _ref.to,
      count = _ref.count;
    return '' + from + (from < to ? '-' + to : '') + ' of ' + count;
  }
};

var PagingPanel$1 = function (_React$PureComponent) {
  inherits(PagingPanel$$1, _React$PureComponent);

  function PagingPanel$$1() {
    classCallCheck(this, PagingPanel$$1);
    return possibleConstructorReturn(this, (PagingPanel$$1.__proto__ || Object.getPrototypeOf(PagingPanel$$1)).apply(this, arguments));
  }

  createClass(PagingPanel$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(PagingPanel, _extends({
        containerComponent: Pager,
        messages: _extends({}, defaultMessages$1, messages)
      }, restProps));
    }
  }]);
  return PagingPanel$$1;
}(PureComponent);

PagingPanel$1.Container = Pager;

PagingPanel$1.propTypes = {
  messages: shape({
    showAll: string,
    rowsPerPage: string,
    info: oneOfType([string, func])
  })
};

PagingPanel$1.defaultProps = {
  messages: {}
};

var styles$5 = function styles$$1(theme) {
  return {
    panel: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      marginTop: theme.spacing.unit * 1.5
    }
  };
};

var GroupPanelContainerBase = function GroupPanelContainerBase(_ref) {
  var classes = _ref.classes,
    children = _ref.children,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['classes', 'children', 'className']);
  return createElement(
    'div',
    _extends({
      className: classNames(classes.panel, className)
    }, restProps),
    children
  );
};

GroupPanelContainerBase.propTypes = {
  classes: object.isRequired,
  children: node,
  className: string
};

GroupPanelContainerBase.defaultProps = {
  children: undefined,
  className: undefined
};

var GroupPanelContainer = withStyles(styles$5, { name: 'GroupPanelContainer' })(GroupPanelContainerBase);

var ENTER_KEY_CODE = 13;
var SPACE_KEY_CODE = 32;

var styles$6 = function styles$$1(theme) {
  return {
    button: {
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 1.5
    },
    draftCell: {
      opacity: 0.3
    }
  };
};

var label = function label(showSortingControls, sortingEnabled, sortingDirection, column) {
  var title = column.title || column.name;
  return showSortingControls ? createElement(
    TableSortLabel,
    {
      active: !!sortingDirection,
      direction: sortingDirection === null ? undefined : sortingDirection,
      disabled: !sortingEnabled,
      tabIndex: -1
    },
    title
  ) : title;
};

var GroupPanelItemBase = function GroupPanelItemBase(_ref) {
  var _classNames;

  var _ref$item = _ref.item,
    column = _ref$item.column,
    draft = _ref$item.draft,
    onGroup = _ref.onGroup,
    showGroupingControls = _ref.showGroupingControls,
    showSortingControls = _ref.showSortingControls,
    sortingDirection = _ref.sortingDirection,
    onSort = _ref.onSort,
    sortingEnabled = _ref.sortingEnabled,
    groupingEnabled = _ref.groupingEnabled,
    classes = _ref.classes,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['item', 'onGroup', 'showGroupingControls', 'showSortingControls', 'sortingDirection', 'onSort', 'sortingEnabled', 'groupingEnabled', 'classes', 'className']);

  var chipClassNames = classNames((_classNames = {}, defineProperty(_classNames, classes.button, true), defineProperty(_classNames, classes.draftCell, draft), _classNames), className);
  var onClick = function onClick(e) {
    var isActionKeyDown = e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE;
    var isMouseClick = e.keyCode === undefined;
    var cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
    var direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey ? null : undefined;

    onSort({
      direction: direction,
      keepOther: cancelSortingRelatedKey
    });
  };

  return createElement(Chip, _extends({
    label: label(showSortingControls, sortingEnabled, sortingDirection, column),
    className: chipClassNames
  }, showGroupingControls ? { onDelete: groupingEnabled ? onGroup : null } : null, showSortingControls ? { onClick: sortingEnabled ? onClick : null } : null, restProps));
};

GroupPanelItemBase.propTypes = {
  item: shape({
    column: shape({
      title: string
    }).isRequired,
    draft: bool
  }).isRequired,
  showSortingControls: bool,
  sortingDirection: oneOf(['asc', 'desc', null]),
  onSort: func,
  onGroup: func,
  showGroupingControls: bool,
  classes: object.isRequired,
  className: string,
  sortingEnabled: bool,
  groupingEnabled: bool
};

GroupPanelItemBase.defaultProps = {
  showSortingControls: false,
  sortingEnabled: false,
  sortingDirection: undefined,
  onSort: undefined,
  onGroup: undefined,
  showGroupingControls: false,
  groupingEnabled: false,
  className: undefined
};

var GroupPanelItem = withStyles(styles$6, { name: 'GroupPanelItem' })(GroupPanelItemBase);

var styles$7 = function styles$$1(theme) {
  return {
    groupInfo: {
      color: theme.typography.caption.color,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize
    }
  };
};

var GroupPanelEmptyMessageBase = function GroupPanelEmptyMessageBase(_ref) {
  var getMessage = _ref.getMessage,
    classes = _ref.classes,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['getMessage', 'classes', 'className']);
  return createElement(
    'div',
    _extends({
      className: classNames(classes.groupInfo, className)
    }, restProps),
    getMessage('groupByColumn')
  );
};

GroupPanelEmptyMessageBase.propTypes = {
  getMessage: func.isRequired,
  classes: object.isRequired,
  className: string
};

GroupPanelEmptyMessageBase.defaultProps = {
  className: undefined
};

var GroupPanelEmptyMessage = withStyles(styles$7, { name: 'GroupPanelEmptyMessage' })(GroupPanelEmptyMessageBase);

var defaultMessages$2 = {
  groupByColumn: 'Drag a column header here to group by that column'
};

var GroupingPanel$1 = function (_React$PureComponent) {
  inherits(GroupingPanel$$1, _React$PureComponent);

  function GroupingPanel$$1() {
    classCallCheck(this, GroupingPanel$$1);
    return possibleConstructorReturn(this, (GroupingPanel$$1.__proto__ || Object.getPrototypeOf(GroupingPanel$$1)).apply(this, arguments));
  }

  createClass(GroupingPanel$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(GroupingPanel, _extends({
        layoutComponent: GroupPanelLayout,
        containerComponent: GroupPanelContainer,
        itemComponent: GroupPanelItem,
        emptyMessageComponent: GroupPanelEmptyMessage,
        messages: _extends({}, defaultMessages$2, messages)
      }, restProps));
    }
  }]);
  return GroupingPanel$$1;
}(PureComponent);

GroupingPanel$1.Container = GroupPanelContainer;
GroupingPanel$1.Item = GroupPanelItem;
GroupingPanel$1.EmptyMessage = GroupPanelEmptyMessage;

GroupingPanel$1.propTypes = {
  messages: shape({
    groupByColumn: string
  })
};

GroupingPanel$1.defaultProps = {
  messages: {}
};

var styles$8 = function styles$$1(theme) {
  return {
    toggleCell: {
      textAlign: 'center',
      textOverflow: 'initial',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: theme.spacing.unit
    },
    toggleCellButton: {
      verticalAlign: 'middle',
      display: 'inline-block',
      height: theme.spacing.unit * 5,
      width: theme.spacing.unit * 5
    }
  };
};

var TableDetailToggleCellBase = function TableDetailToggleCellBase(_ref) {
  var style = _ref.style,
    expanded = _ref.expanded,
    classes = _ref.classes,
    onToggle = _ref.onToggle,
    tableColumn = _ref.tableColumn,
    tableRow = _ref.tableRow,
    row = _ref.row,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['style', 'expanded', 'classes', 'onToggle', 'tableColumn', 'tableRow', 'row', 'className']);

  var handleClick = function handleClick(e) {
    e.stopPropagation();
    onToggle();
  };
  return createElement(
    TableCell,
    _extends({
      className: classNames(classes.toggleCell, className),
      style: style
    }, restProps),
    createElement(
      IconButton,
      {
        className: classes.toggleCellButton,
        onClick: handleClick
      },
      expanded ? createElement(ExpandMore, null) : createElement(ExpandLess, null)
    )
  );
};

TableDetailToggleCellBase.propTypes = {
  style: object,
  expanded: bool,
  classes: object.isRequired,
  onToggle: func,
  className: string,
  tableColumn: object,
  tableRow: object,
  row: object
};

TableDetailToggleCellBase.defaultProps = {
  style: null,
  expanded: false,
  onToggle: function onToggle() { },
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined
};

var TableDetailToggleCell = withStyles(styles$8, { name: 'TableDetailToggleCell' })(TableDetailToggleCellBase);

var styles$9 = function styles$$1(theme) {
  return {
    active: {
      backgroundColor: theme.palette.background.default
    }
  };
};

var TableDetailCellBase = function TableDetailCellBase(_ref) {
  var colSpan = _ref.colSpan,
    style = _ref.style,
    children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    tableColumn = _ref.tableColumn,
    tableRow = _ref.tableRow,
    row = _ref.row,
    restProps = objectWithoutProperties(_ref, ['colSpan', 'style', 'children', 'classes', 'className', 'tableColumn', 'tableRow', 'row']);
  return createElement(
    TableCell,
    _extends({
      style: style,
      colSpan: colSpan,
      className: classNames(classes.active, className)
    }, restProps),
    children
  );
};

TableDetailCellBase.propTypes = {
  style: object,
  colSpan: number,
  children: node,
  classes: object.isRequired,
  className: string,
  tableColumn: object,
  tableRow: object,
  row: object
};

TableDetailCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  row: undefined,
  children: undefined
};

var TableDetailCell = withStyles(styles$9, { name: 'TableDetailCell' })(TableDetailCellBase);

var TableRow$1 = function TableRow$$1(_ref) {
  var children = _ref.children,
    row = _ref.row,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    restProps = objectWithoutProperties(_ref, ['children', 'row', 'tableRow', 'tableColumn']);
  return createElement(
    TableRow,
    restProps,
    children
  );
};

TableRow$1.propTypes = {
  children: node,
  row: object,
  tableRow: object,
  tableColumn: object
};

TableRow$1.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined
};

var TableRowDetail$1 = function (_React$PureComponent) {
  inherits(TableRowDetail$$1, _React$PureComponent);

  function TableRowDetail$$1() {
    classCallCheck(this, TableRowDetail$$1);
    return possibleConstructorReturn(this, (TableRowDetail$$1.__proto__ || Object.getPrototypeOf(TableRowDetail$$1)).apply(this, arguments));
  }

  createClass(TableRowDetail$$1, [{
    key: 'render',
    value: function render() {
      return createElement(TableRowDetail, _extends({
        toggleCellComponent: TableDetailToggleCell,
        cellComponent: TableDetailCell,
        rowComponent: TableRow$1,
        toggleColumnWidth: 48
      }, this.props));
    }
  }]);
  return TableRowDetail$$1;
}(PureComponent);

TableRowDetail$1.Cell = TableDetailCell;
TableRowDetail$1.ToggleCell = TableDetailToggleCell;
TableRowDetail$1.Row = TableRow$1;

var styles$10 = function styles$$1(theme) {
  return {
    cell: {
      cursor: 'pointer',
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingTop: theme.spacing.unit / 2 - 1
    },
    indentCell: {
      padding: 0
    },
    groupButton: {
      verticalAlign: 'middle',
      display: 'inline-block',
      height: theme.spacing.unit * 5,
      width: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit
    },
    columnTitle: {
      verticalAlign: 'middle'
    }
  };
};

var TableGroupCellBase = function TableGroupCellBase(_ref) {
  var style = _ref.style,
    colSpan = _ref.colSpan,
    row = _ref.row,
    column = _ref.column,
    expanded = _ref.expanded,
    onToggle = _ref.onToggle,
    classes = _ref.classes,
    children = _ref.children,
    className = _ref.className,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    restProps = objectWithoutProperties(_ref, ['style', 'colSpan', 'row', 'column', 'expanded', 'onToggle', 'classes', 'children', 'className', 'tableRow', 'tableColumn']);

  var handleClick = function handleClick() {
    return onToggle();
  };

  return createElement(
    TableCell,
    _extends({
      colSpan: colSpan,
      style: style,
      className: classNames(classes.cell, className),
      onClick: handleClick
    }, restProps),
    createElement(
      IconButton,
      {
        className: classes.groupButton
      },
      expanded ? createElement(ExpandMore, null) : createElement(ChevronRight, null)
    ),
    createElement(
      'span',
      { className: classes.columnTitle },
      createElement(
        'strong',
        null,
        column.title || column.name,
        ': '
      ),
      children || row.value
    )
  );
};

TableGroupCellBase.propTypes = {
  style: object,
  colSpan: number,
  row: object,
  column: object,
  expanded: bool,
  onToggle: func,
  classes: object.isRequired,
  children: node,
  className: string,
  tableRow: object,
  tableColumn: object
};

TableGroupCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: function onToggle() { },
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined
};

var TableGroupCell = withStyles(styles$10, { name: 'TableGroupCell' })(TableGroupCellBase);

var TableGroupRow$1 = function (_React$PureComponent) {
  inherits(TableGroupRow$$1, _React$PureComponent);

  function TableGroupRow$$1() {
    classCallCheck(this, TableGroupRow$$1);
    return possibleConstructorReturn(this, (TableGroupRow$$1.__proto__ || Object.getPrototypeOf(TableGroupRow$$1)).apply(this, arguments));
  }

  createClass(TableGroupRow$$1, [{
    key: 'render',
    value: function render() {
      return createElement(TableGroupRow, _extends({
        cellComponent: TableGroupCell,
        rowComponent: TableRow$1,
        indentColumnWidth: 48
      }, this.props));
    }
  }]);
  return TableGroupRow$$1;
}(PureComponent);

TableGroupRow$1.Row = TableRow$1;
TableGroupRow$1.Cell = TableGroupCell;

var styles$11 = function styles$$1(theme) {
  return {
    cell: {
      overflow: 'visible',
      paddingRight: 0,
      paddingLeft: theme.spacing.unit,
      textAlign: 'center'
    },
    alignWithRowSpan: {
      verticalAlign: 'bottom',
      paddingBottom: theme.spacing.unit / 2
    },
    pointer: {
      cursor: 'pointer'
    }
  };
};

var TableSelectAllCellBase = function TableSelectAllCellBase(_ref) {
  var _classNames;

  var allSelected = _ref.allSelected,
    someSelected = _ref.someSelected,
    disabled = _ref.disabled,
    onToggle = _ref.onToggle,
    classes = _ref.classes,
    className = _ref.className,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    rowSpan = _ref.rowSpan,
    restProps = objectWithoutProperties(_ref, ['allSelected', 'someSelected', 'disabled', 'onToggle', 'classes', 'className', 'tableRow', 'tableColumn', 'rowSpan']);

  var cellClasses = classNames((_classNames = {}, defineProperty(_classNames, classes.cell, true), defineProperty(_classNames, classes.pointer, !disabled), defineProperty(_classNames, classes.alignWithRowSpan, rowSpan > 1), _classNames), className);

  return createElement(
    TableCell,
    _extends({
      padding: 'checkbox',
      className: cellClasses,
      rowSpan: rowSpan
    }, restProps),
    createElement(Checkbox, {
      checked: allSelected,
      indeterminate: someSelected,
      disabled: disabled,
      onClick: function onClick(e) {
        if (disabled) return;

        e.stopPropagation();
        onToggle();
      }
    })
  );
};

TableSelectAllCellBase.propTypes = {
  allSelected: bool,
  someSelected: bool,
  disabled: bool,
  onToggle: func,
  classes: object.isRequired,
  className: string,
  tableRow: object,
  tableColumn: object,
  rowSpan: number
};

TableSelectAllCellBase.defaultProps = {
  allSelected: false,
  someSelected: false,
  disabled: false,
  onToggle: function onToggle() { },
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined
};

var TableSelectAllCell = withStyles(styles$11, { name: 'TableSelectAllCell' })(TableSelectAllCellBase);

var styles$12 = function styles$$1(theme) {
  return {
    cell: {
      overflow: 'visible',
      paddingRight: 0,
      paddingLeft: theme.spacing.unit,
      textAlign: 'center'
    },
    checkbox: {
      marginTop: '-1px',
      marginBottom: '-1px',
      width: theme.spacing.unit * 5,
      height: theme.spacing.unit * 5
    }
  };
};

var TableSelectCellBase = function TableSelectCellBase(_ref) {
  var style = _ref.style,
    selected = _ref.selected,
    onToggle = _ref.onToggle,
    classes = _ref.classes,
    className = _ref.className,
    row = _ref.row,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    restProps = objectWithoutProperties(_ref, ['style', 'selected', 'onToggle', 'classes', 'className', 'row', 'tableRow', 'tableColumn']);
  return createElement(
    TableCell,
    _extends({
      padding: 'checkbox',
      style: style,
      className: classNames(classes.cell, className)
    }, restProps),
    createElement(Checkbox, {
      className: classes.checkbox,
      checked: selected,
      onClick: function onClick(e) {
        e.stopPropagation();
        onToggle();
      }
    })
  );
};

TableSelectCellBase.propTypes = {
  style: object,
  selected: bool,
  onToggle: func,
  classes: object.isRequired,
  row: object,
  tableRow: object,
  tableColumn: object,
  className: string
};

TableSelectCellBase.defaultProps = {
  style: null,
  selected: false,
  onToggle: function onToggle() { },
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined
};

var TableSelectCell = withStyles(styles$12, { name: 'TableSelectCell' })(TableSelectCellBase);

var TableSelectRow = function TableSelectRow(_ref) {
  var selected = _ref.selected,
    selectByRowClick = _ref.selectByRowClick,
    onToggle = _ref.onToggle,
    row = _ref.row,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    children = _ref.children,
    restProps = objectWithoutProperties(_ref, ['selected', 'selectByRowClick', 'onToggle', 'row', 'tableRow', 'tableColumn', 'children']);
  return createElement(
    TableRow,
    _extends({
      selected: selected,
      onClick: function onClick(e) {
        if (!selectByRowClick) return;
        e.stopPropagation();
        onToggle();
      }
    }, restProps),
    children
  );
};

TableSelectRow.propTypes = {
  children: node,
  onToggle: func,
  selected: bool,
  selectByRowClick: bool,
  row: object,
  tableColumn: object,
  tableRow: object
};

TableSelectRow.defaultProps = {
  children: undefined,
  onToggle: function onToggle() { },
  selected: false,
  selectByRowClick: false,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined
};

var TableSelection$1 = function (_React$PureComponent) {
  inherits(TableSelection$$1, _React$PureComponent);

  function TableSelection$$1() {
    classCallCheck(this, TableSelection$$1);
    return possibleConstructorReturn(this, (TableSelection$$1.__proto__ || Object.getPrototypeOf(TableSelection$$1)).apply(this, arguments));
  }

  createClass(TableSelection$$1, [{
    key: 'render',
    value: function render() {
      return createElement(TableSelection, _extends({
        rowComponent: TableSelectRow,
        cellComponent: TableSelectCell,
        headerCellComponent: TableSelectAllCell,
        selectionColumnWidth: 58
      }, this.props));
    }
  }]);
  return TableSelection$$1;
}(PureComponent);

TableSelection$1.Cell = TableSelectCell;
TableSelection$1.HeaderCell = TableSelectAllCell;

var styles$13 = function styles$$1(theme) {
  return {
    table: {
      tableLayout: 'fixed'
    },
    headTable: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      overflow: 'visible',
      background: theme.palette.background.paper,
      fallbacks: {
        position: '-webkit-sticky'
      }
    }
  };
};

var TableBase = function TableBase(_ref) {
  var _classNames;

  var children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    use = _ref.use,
    restProps = objectWithoutProperties(_ref, ['children', 'classes', 'className', 'use']);
  return createElement(
    TableMUI,
    _extends({
      className: classNames((_classNames = {}, defineProperty(_classNames, classes.table, true), defineProperty(_classNames, classes.headTable, use === 'head'), _classNames), className)
    }, restProps),
    children
  );
};

TableBase.propTypes = {
  use: oneOf(['head']),
  children: node.isRequired,
  classes: object.isRequired,
  className: string
};

TableBase.defaultProps = {
  use: undefined,
  className: undefined
};

var Table$2 = withStyles(styles$13, { name: 'Table' })(TableBase);

var MINIMAL_COLUMN_WIDTH = 120;

var TableLayout$1 = function TableLayout$$1(props) {
  return createElement(TableLayout, _extends({
    layoutComponent: StaticTableLayout,
    minColumnWidth: MINIMAL_COLUMN_WIDTH
  }, props));
};

var styles$14 = function styles$$1(theme) {
  return {
    cell: {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 3
      },
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    cellRightAlign: {
      textAlign: 'right'
    },
    cellCenterAlign: {
      textAlign: 'center'
    },
    cellNoWrap: {
      whiteSpace: 'nowrap'
    }
  };
};

var TableCellBase = function TableCellBase(_ref) {
  var _classNames;

  var column = _ref.column,
    value = _ref.value,
    children = _ref.children,
    classes = _ref.classes,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    row = _ref.row,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['column', 'value', 'children', 'classes', 'tableRow', 'tableColumn', 'row', 'className']);
  return createElement(
    TableCell,
    _extends({
      className: classNames((_classNames = {}, defineProperty(_classNames, classes.cell, true), defineProperty(_classNames, classes.cellRightAlign, tableColumn && tableColumn.align === 'right'), defineProperty(_classNames, classes.cellCenterAlign, tableColumn && tableColumn.align === 'center'), defineProperty(_classNames, classes.cellNoWrap, !(tableColumn && tableColumn.wordWrapEnabled)), _classNames), className)
    }, restProps),
    children || value
  );
};

TableCellBase.propTypes = {
  value: any,
  column: object,
  row: object,
  classes: object.isRequired,
  children: node,
  tableRow: object,
  tableColumn: object,
  className: string
};

TableCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined
};

var TableCell$1 = withStyles(styles$14, { name: 'TableCell' })(TableCellBase);

var styles$15 = {
  cell: {
    padding: 0
  }
};

var TableStubCellBase = function TableStubCellBase(_ref) {
  var style = _ref.style,
    classes = _ref.classes,
    className = _ref.className,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    restProps = objectWithoutProperties(_ref, ['style', 'classes', 'className', 'tableRow', 'tableColumn']);
  return createElement(TableCell, _extends({
    style: style,
    className: classNames(classes.cell, className)
  }, restProps));
};

TableStubCellBase.propTypes = {
  style: object,
  classes: object.isRequired,
  className: string,
  tableRow: object,
  tableColumn: object
};

TableStubCellBase.defaultProps = {
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined
};

var TableStubCell = withStyles(styles$15, { name: 'TableStubCell' })(TableStubCellBase);

var styles$16 = function styles$$1(theme) {
  return {
    cell: {
      textAlign: 'center',
      padding: theme.spacing.unit * 5 + 'px 0'
    }
  };
};

var TableNoDataCellBase = function TableNoDataCellBase(_ref) {
  var style = _ref.style,
    colSpan = _ref.colSpan,
    getMessage = _ref.getMessage,
    classes = _ref.classes,
    className = _ref.className,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    restProps = objectWithoutProperties(_ref, ['style', 'colSpan', 'getMessage', 'classes', 'className', 'tableRow', 'tableColumn']);
  return createElement(
    TableCell,
    _extends({
      style: style,
      className: classNames(classes.cell, className),
      colSpan: colSpan
    }, restProps),
    createElement(
      'big',
      null,
      getMessage('noData')
    )
  );
};

TableNoDataCellBase.propTypes = {
  style: object,
  colSpan: number,
  getMessage: func.isRequired,
  classes: object.isRequired,
  className: string,
  tableRow: object,
  tableColumn: object
};

TableNoDataCellBase.defaultProps = {
  style: null,
  colSpan: 1,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined
};

var TableNoDataCell = withStyles(styles$16, { name: 'TableNoDataCell' })(TableNoDataCellBase);

var styles$17 = {
  root: {
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch'
  }
};

var TableContainerBase = function TableContainerBase(_ref) {
  var children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['children', 'classes', 'className']);
  return createElement(
    'div',
    _extends({
      className: classNames(classes.root, className)
    }, restProps),
    children
  );
};

TableContainerBase.propTypes = {
  children: node.isRequired,
  classes: object.isRequired,
  className: string
};

TableContainerBase.defaultProps = {
  className: undefined
};

var TableContainer = withStyles(styles$17, { name: 'TableContainer' })(TableContainerBase);

var TableStubRow = function TableStubRow(_ref) {
  var children = _ref.children,
    tableRow = _ref.tableRow,
    restProps = objectWithoutProperties(_ref, ['children', 'tableRow']);
  return createElement(
    TableRow,
    restProps,
    children
  );
};

TableStubRow.propTypes = {
  children: node,
  tableRow: object
};

TableStubRow.defaultProps = {
  children: undefined,
  tableRow: undefined
};

var defaultMessages$3 = {
  noData: 'No data'
};

var Table$1 = function (_React$PureComponent) {
  inherits(Table$$1, _React$PureComponent);

  function Table$$1() {
    classCallCheck(this, Table$$1);
    return possibleConstructorReturn(this, (Table$$1.__proto__ || Object.getPrototypeOf(Table$$1)).apply(this, arguments));
  }

  createClass(Table$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(Table, _extends({
        tableComponent: Table$2,
        headComponent: TableHead,
        bodyComponent: TableBody,
        containerComponent: TableContainer,
        layoutComponent: TableLayout$1,
        rowComponent: TableRow$1,
        cellComponent: TableCell$1,
        noDataRowComponent: TableRow$1,
        noDataCellComponent: TableNoDataCell,
        stubRowComponent: TableStubRow,
        stubCellComponent: TableStubCell,
        stubHeaderCellComponent: TableStubCell,
        messages: _extends({}, defaultMessages$3, messages)
      }, restProps));
    }
  }]);
  return Table$$1;
}(PureComponent);

Table$1.Cell = TableCell$1;
Table$1.Row = TableRow$1;
Table$1.NoDataCell = TableNoDataCell;
Table$1.NoDataRow = TableRow$1;
Table$1.StubRow = TableStubRow;
Table$1.StubCell = TableStubCell;
Table$1.StubHeaderCell = TableStubCell;
Table$1.Table = Table$2;
Table$1.TableHead = TableHead;
Table$1.TableBody = TableBody;
Table$1.Container = TableContainer;

Table$1.propTypes = {
  messages: shape({
    noData: string
  })
};

Table$1.defaultProps = {
  messages: {}
};

var MINIMAL_COLUMN_WIDTH$1 = 120;

var VirtualTableLayout$1 = function VirtualTableLayout$$1(props) {
  return createElement(TableLayout, _extends({
    layoutComponent: VirtualTableLayout,
    minColumnWidth: MINIMAL_COLUMN_WIDTH$1
  }, props));
};

var FixedHeader = function FixedHeader(props) {
  return createElement(Table$2, _extends({ use: 'head' }, props));
};

var defaultMessages$4 = {
  noData: 'No data'
};

var VirtualTable = function (_React$PureComponent) {
  inherits(VirtualTable, _React$PureComponent);

  function VirtualTable(props) {
    classCallCheck(this, VirtualTable);

    var _this = possibleConstructorReturn(this, (VirtualTable.__proto__ || Object.getPrototypeOf(VirtualTable)).call(this, props));

    var height = props.height,
      estimatedRowHeight = props.estimatedRowHeight,
      headTableComponent = props.headTableComponent;

    _this.layoutRenderComponent = createRenderComponent(VirtualTableLayout$1, {
      height: height, estimatedRowHeight: estimatedRowHeight, headTableComponent: headTableComponent
    });
    return _this;
  }

  createClass(VirtualTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var height = _ref.height,
        estimatedRowHeight = _ref.estimatedRowHeight,
        headTableComponent = _ref.headTableComponent;

      this.layoutRenderComponent.update({ height: height, estimatedRowHeight: estimatedRowHeight, headTableComponent: headTableComponent });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
        height = _props.height,
        estimatedRowHeight = _props.estimatedRowHeight,
        headTableComponent = _props.headTableComponent,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['height', 'estimatedRowHeight', 'headTableComponent', 'messages']);


      return createElement(Table, _extends({
        layoutComponent: this.layoutRenderComponent.component,
        bodyComponent: TableBody,
        headComponent: TableHead,
        tableComponent: Table$2,
        containerComponent: TableContainer,
        rowComponent: TableRow$1,
        cellComponent: TableCell$1,
        noDataRowComponent: TableRow$1,
        noDataCellComponent: TableNoDataCell,
        stubRowComponent: TableStubRow,
        stubCellComponent: TableStubCell,
        stubHeaderCellComponent: TableStubCell,
        messages: _extends({}, defaultMessages$4, messages)
      }, restProps));
    }
  }]);
  return VirtualTable;
}(PureComponent);

VirtualTable.Cell = TableCell$1;
VirtualTable.Row = TableRow$1;
VirtualTable.NoDataCell = TableNoDataCell;
VirtualTable.NoDataRow = TableRow$1;
VirtualTable.StubCell = TableStubCell;
VirtualTable.StubHeaderCell = TableStubCell;
VirtualTable.Table = Table$2;
VirtualTable.TableHead = TableHead;
VirtualTable.TableBody = TableBody;
VirtualTable.FixedHeader = FixedHeader;
VirtualTable.Container = TableContainer;
VirtualTable.StubRow = TableStubRow;

VirtualTable.propTypes = {
  estimatedRowHeight: number,
  height: number,
  headTableComponent: func,
  messages: shape({
    noData: string
  })
};

VirtualTable.defaultProps = {
  estimatedRowHeight: 48,
  height: 530,
  headTableComponent: FixedHeader,
  messages: {}
};

var styles$18 = function styles$$1(_ref) {
  var spacing = _ref.spacing;
  return {
    cell: {
      paddingRight: spacing.unit,
      paddingLeft: spacing.unit,
      '&:first-child': {
        paddingLeft: spacing.unit * 3
      }
    },
    input: {
      width: '100%'
    }
  };
};

var TableFilterCellBase = function TableFilterCellBase(_ref2) {
  var style = _ref2.style,
    filter = _ref2.filter,
    getMessage = _ref2.getMessage,
    onFilter = _ref2.onFilter,
    classes = _ref2.classes,
    children = _ref2.children,
    className = _ref2.className,
    tableRow = _ref2.tableRow,
    tableColumn = _ref2.tableColumn,
    column = _ref2.column,
    filteringEnabled = _ref2.filteringEnabled,
    restProps = objectWithoutProperties(_ref2, ['style', 'filter', 'getMessage', 'onFilter', 'classes', 'children', 'className', 'tableRow', 'tableColumn', 'column', 'filteringEnabled']);
  return createElement(
    TableCell,
    _extends({
      className: classNames(classes.cell, className),
      style: style
    }, restProps),
    children || createElement(Input, {
      className: classes.input,
      value: filter ? filter.value : '',
      placeholder: getMessage('filterPlaceholder'),
      disabled: !filteringEnabled,
      onChange: function onChange(e) {
        return onFilter(e.target.value ? { value: e.target.value } : null);
      }
    })
  );
};

TableFilterCellBase.propTypes = {
  style: object,
  filter: object,
  onFilter: func,
  classes: object.isRequired,
  children: node,
  getMessage: func.isRequired,
  className: string,
  tableRow: object,
  tableColumn: object,
  column: object,
  filteringEnabled: bool
};

TableFilterCellBase.defaultProps = {
  style: null,
  filter: null,
  onFilter: function onFilter() { },
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  column: undefined,
  filteringEnabled: true
};

var TableFilterCell = withStyles(styles$18, { name: 'TableFilterCell' })(TableFilterCellBase);

var defaultMessages$5 = {
  filterPlaceholder: 'Filter...'
};

var TableFilterRow$1 = function (_React$PureComponent) {
  inherits(TableFilterRow$$1, _React$PureComponent);

  function TableFilterRow$$1() {
    classCallCheck(this, TableFilterRow$$1);
    return possibleConstructorReturn(this, (TableFilterRow$$1.__proto__ || Object.getPrototypeOf(TableFilterRow$$1)).apply(this, arguments));
  }

  createClass(TableFilterRow$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(TableFilterRow, _extends({
        cellComponent: TableFilterCell,
        rowComponent: TableRow$1,
        messages: _extends({}, defaultMessages$5, messages)
      }, restProps));
    }
  }]);
  return TableFilterRow$$1;
}(PureComponent);

TableFilterRow$1.Cell = TableFilterCell;
TableFilterRow$1.Row = TableRow$1;

TableFilterRow$1.propTypes = {
  messages: shape({
    filterPlaceholder: string
  })
};

TableFilterRow$1.defaultProps = {
  messages: {}
};

var styles$20 = function styles$$1(theme) {
  return {
    groupingControl: {
      paddingLeft: 0,
      height: theme.spacing.unit * 3,
      cursor: 'pointer'
    },
    disabledGroupingControl: {
      cursor: 'default',
      opacity: 0.3
    }
  };
};

var GroupingControlBase = function GroupingControlBase(_ref) {
  var _classNames;

  var disabled = _ref.disabled,
    onGroup = _ref.onGroup,
    classes = _ref.classes;
  return createElement(
    'div',
    {
      onClick: function onClick(e) {
        if (disabled) return;
        e.stopPropagation();
        onGroup(e);
      },
      className: classNames((_classNames = {}, defineProperty(_classNames, classes.groupingControl, true), defineProperty(_classNames, classes.disabledGroupingControl, disabled), _classNames))
    },
    createElement(List$1, null)
  );
};

GroupingControlBase.propTypes = {
  onGroup: func.isRequired,
  classes: object.isRequired,
  disabled: bool
};

GroupingControlBase.defaultProps = {
  disabled: false
};

var GroupingControl = withStyles(styles$20, { name: 'GroupingControl' })(GroupingControlBase);

var styles$21 = function styles$$1(theme) {
  return {
    resizeHandle: {
      position: 'absolute',
      userSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      width: theme.spacing.unit * 2 + 'px',
      top: 0,
      right: '-' + theme.spacing.unit + 'px',
      height: '100%',
      cursor: 'col-resize',
      zIndex: 100
    },
    resizeHandleLine: {
      position: 'absolute',
      backgroundColor: theme.palette.primary[300],
      height: '50%',
      width: '1px',
      top: '25%',
      transition: 'all linear 100ms'
    },
    resizeHandleFirstLine: {
      left: theme.spacing.unit - 1 + 'px'
    },
    resizeHandleSecondLine: {
      left: theme.spacing.unit + 1 + 'px'
    },
    resizeHandleLineActive: {
      left: theme.spacing.unit + 'px'
    },
    resizeHandleActive: {
      '& $resizeHandleLine': {
        opacity: '1',
        backgroundColor: theme.palette.primary[300],
        height: 'calc(100% - 4px)',
        top: '2px'
      }
    }
  };
};

var ResizingControlBase = function (_React$PureComponent) {
  inherits(ResizingControlBase, _React$PureComponent);

  function ResizingControlBase(props) {
    classCallCheck(this, ResizingControlBase);

    var _this = possibleConstructorReturn(this, (ResizingControlBase.__proto__ || Object.getPrototypeOf(ResizingControlBase)).call(this, props));

    _this.state = {
      resizing: false
    };

    _this.onResizeStart = function (_ref) {
      var x = _ref.x;

      _this.resizeStartingX = x;
      _this.setState({ resizing: true });
    };
    _this.onResizeUpdate = function (_ref2) {
      var x = _ref2.x;
      var onWidthDraft = _this.props.onWidthDraft;

      onWidthDraft({ shift: x - _this.resizeStartingX });
    };
    _this.onResizeEnd = function (_ref3) {
      var x = _ref3.x;
      var _this$props = _this.props,
        onWidthChange = _this$props.onWidthChange,
        onWidthDraftCancel = _this$props.onWidthDraftCancel;

      onWidthDraftCancel();
      onWidthChange({ shift: x - _this.resizeStartingX });
      _this.setState({ resizing: false });
    };
    return _this;
  }

  createClass(ResizingControlBase, [{
    key: 'render',
    value: function render() {
      var _classNames, _classNames2, _classNames3;

      var _props = this.props,
        classes = _props.classes,
        resizeHandleOpacityClass = _props.resizeHandleOpacityClass;
      var resizing = this.state.resizing;


      return createElement(
        Draggable,
        {
          onStart: this.onResizeStart,
          onUpdate: this.onResizeUpdate,
          onEnd: this.onResizeEnd
        },
        createElement(
          'div',
          {
            className: classNames((_classNames = {}, defineProperty(_classNames, classes.resizeHandle, true), defineProperty(_classNames, classes.resizeHandleActive, resizing), _classNames))
          },
          createElement('div', {
            className: classNames((_classNames2 = {}, defineProperty(_classNames2, resizeHandleOpacityClass, true), defineProperty(_classNames2, classes.resizeHandleLine, true), defineProperty(_classNames2, classes.resizeHandleFirstLine, true), defineProperty(_classNames2, classes.resizeHandleLineActive, resizing), _classNames2))
          }),
          createElement('div', {
            className: classNames((_classNames3 = {}, defineProperty(_classNames3, resizeHandleOpacityClass, true), defineProperty(_classNames3, classes.resizeHandleLine, true), defineProperty(_classNames3, classes.resizeHandleSecondLine, true), defineProperty(_classNames3, classes.resizeHandleLineActive, resizing), _classNames3))
          })
        )
      );
    }
  }]);
  return ResizingControlBase;
}(PureComponent);

ResizingControlBase.propTypes = {
  onWidthChange: func.isRequired,
  onWidthDraft: func.isRequired,
  onWidthDraftCancel: func.isRequired,
  classes: object.isRequired,
  resizeHandleOpacityClass: string.isRequired
};

var ResizingControl = withStyles(styles$21, { name: 'ResizingControl' })(ResizingControlBase);

var styles$22 = function styles$$1(theme) {
  return {
    tooltipRoot: {
      display: 'block'
    },
    sortLabelRoot: {
      height: theme.spacing.unit * 3,
      maxWidth: '100%'
    },
    sortLabelActive: {
      color: 'inherit'
    },
    sortLabelText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };
};

var SortingControlBase = function SortingControlBase(_ref) {
  var align = _ref.align,
    sortingDirection = _ref.sortingDirection,
    columnTitle = _ref.columnTitle,
    onClick = _ref.onClick,
    classes = _ref.classes,
    getMessage = _ref.getMessage,
    disabled = _ref.disabled;
  return createElement(
    Tooltip,
    {
      title: getMessage('sortingHint'),
      placement: align === 'right' ? 'bottom-end' : 'bottom-start',
      enterDelay: 300,
      classes: {
        root: classes.tooltipRoot
      }
    },
    createElement(
      TableSortLabel,
      {
        active: !!sortingDirection,
        direction: sortingDirection === null ? undefined : sortingDirection,
        onClick: onClick,
        disabled: disabled,
        classes: {
          root: classes.sortLabelRoot,
          active: classes.sortLabelActive
        }
      },
      createElement(
        'span',
        { className: classes.sortLabelText },
        columnTitle
      )
    )
  );
};

SortingControlBase.propTypes = {
  align: string.isRequired,
  sortingDirection: oneOf(['asc', 'desc', null]),
  columnTitle: string.isRequired,
  classes: object.isRequired,
  onClick: func.isRequired,
  getMessage: func.isRequired,
  disabled: bool
};

SortingControlBase.defaultProps = {
  sortingDirection: undefined,
  disabled: false
};

var SortingControl = withStyles(styles$22, { name: 'SortingControl' })(SortingControlBase);

var ENTER_KEY_CODE$1 = 13;
var SPACE_KEY_CODE$1 = 32;

var styles$19 = function styles$$1(theme) {
  return {
    plainTitle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: theme.spacing.unit * 3 + 'px'
    },
    cell: {
      outline: 'none',
      position: 'relative',
      overflow: 'visible',
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 3
      },
      '&:hover $resizeHandleLine': {
        opacity: 1
      }
    },
    resizeHandleLine: {
      opacity: 0
    },
    '@media (pointer: fine)': {
      resizeHandleLine: {
        opacity: 0
      },
      resizeHandleActive: {
        '& $resizeHandleLine': {
          opacity: 1
        }
      },
      resizeHandle: {
        '&:hover $resizeHandleLine': {
          opacity: 1
        }
      }
    },
    cellNoUserSelect: {
      userSelect: 'none',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none'
    },
    cellDraggable: {
      cursor: 'pointer'
    },
    cellDimmed: {
      opacity: 0.3
    },
    cellRight: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    cellCenter: {
      textAlign: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    content: {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    contentRight: {
      flexDirection: 'row-reverse'
    },
    contentNoWrap: {
      whiteSpace: 'nowrap'
    }
  };
};

var TableHeaderCellBase = function (_React$PureComponent) {
  inherits(TableHeaderCellBase, _React$PureComponent);

  function TableHeaderCellBase(props) {
    classCallCheck(this, TableHeaderCellBase);

    var _this = possibleConstructorReturn(this, (TableHeaderCellBase.__proto__ || Object.getPrototypeOf(TableHeaderCellBase)).call(this, props));

    _this.state = {
      dragging: false
    };

    _this.onClick = function (e) {
      var _this$props = _this.props,
        onSort = _this$props.onSort,
        sortingEnabled = _this$props.sortingEnabled;

      if (!sortingEnabled) return;

      var isActionKeyDown = e.keyCode === ENTER_KEY_CODE$1 || e.keyCode === SPACE_KEY_CODE$1;
      var isMouseClick = e.keyCode === undefined;

      var cancelSortingRelatedKey = e.metaKey || e.ctrlKey;
      var direction = (isMouseClick || isActionKeyDown) && cancelSortingRelatedKey ? null : undefined;

      e.preventDefault();
      onSort({
        direction: direction,
        keepOther: e.shiftKey || cancelSortingRelatedKey
      });
    };
    return _this;
  }

  createClass(TableHeaderCellBase, [{
    key: 'render',
    value: function render() {
      var _classNames,
        _classNames2,
        _this2 = this;

      var _props = this.props,
        style = _props.style,
        column = _props.column,
        tableColumn = _props.tableColumn,
        showSortingControls = _props.showSortingControls,
        sortingDirection = _props.sortingDirection,
        showGroupingControls = _props.showGroupingControls,
        onGroup = _props.onGroup,
        groupingEnabled = _props.groupingEnabled,
        draggingEnabled = _props.draggingEnabled,
        resizingEnabled = _props.resizingEnabled,
        onWidthChange = _props.onWidthChange,
        onWidthDraft = _props.onWidthDraft,
        onWidthDraftCancel = _props.onWidthDraftCancel,
        sortingEnabled = _props.sortingEnabled,
        classes = _props.classes,
        getMessage = _props.getMessage,
        tableRow = _props.tableRow,
        className = _props.className,
        onSort = _props.onSort,
        before = _props.before,
        restProps = objectWithoutProperties(_props, ['style', 'column', 'tableColumn', 'showSortingControls', 'sortingDirection', 'showGroupingControls', 'onGroup', 'groupingEnabled', 'draggingEnabled', 'resizingEnabled', 'onWidthChange', 'onWidthDraft', 'onWidthDraftCancel', 'sortingEnabled', 'classes', 'getMessage', 'tableRow', 'className', 'onSort', 'before']);
      var dragging = this.state.dragging;

      var align = tableColumn && tableColumn.align || 'left';
      var columnTitle = column && (column.title || column.name);

      var tableCellClasses = classNames((_classNames = {}, defineProperty(_classNames, classes.cell, true), defineProperty(_classNames, classes.cellRight, align === 'right'), defineProperty(_classNames, classes.cellCenter, align === 'center'), defineProperty(_classNames, classes.cellNoUserSelect, draggingEnabled || showSortingControls), defineProperty(_classNames, classes.cellDraggable, draggingEnabled), defineProperty(_classNames, classes.cellDimmed, dragging || tableColumn && tableColumn.draft), _classNames), className);
      var contentClassed = classNames((_classNames2 = {}, defineProperty(_classNames2, classes.content, true), defineProperty(_classNames2, classes.contentNoWrap, !(tableColumn && tableColumn.wordWrapEnabled)), defineProperty(_classNames2, classes.contentRight, align === 'right'), _classNames2));
      var cellLayout = createElement(
        TableCell,
        _extends({
          style: style,
          className: tableCellClasses,
          numeric: align === 'right'
        }, restProps),
        createElement(
          'div',
          { className: classes.container },
          before,
          createElement(
            'div',
            { className: contentClassed },
            showSortingControls ? createElement(SortingControl, {
              align: align,
              disabled: !sortingEnabled,
              sortingDirection: sortingDirection,
              columnTitle: columnTitle,
              onClick: this.onClick,
              getMessage: getMessage
            }) : createElement(
              'span',
              { className: classes.plainTitle },
              columnTitle
            )
          ),
          showGroupingControls && createElement(
            'div',
            { className: classes.controls },
            createElement(GroupingControl, {
              disabled: !groupingEnabled,
              onGroup: onGroup
            })
          )
        ),
        resizingEnabled && createElement(ResizingControl, {
          onWidthChange: onWidthChange,
          onWidthDraft: onWidthDraft,
          onWidthDraftCancel: onWidthDraftCancel,
          resizeHandleOpacityClass: classes.resizeHandleLine
        })
      );

      return draggingEnabled ? createElement(
        DragSource,
        {
          ref: function ref(element) {
            _this2.cellRef = element;
          },
          payload: [{ type: 'column', columnName: column.name }],
          onStart: function onStart() {
            return _this2.setState({ dragging: true });
          },
          onEnd: function onEnd() {
            return _this2.cellRef && _this2.setState({ dragging: false });
          }
        },
        cellLayout
      ) : cellLayout;
    }
  }]);
  return TableHeaderCellBase;
}(PureComponent);

TableHeaderCellBase.propTypes = {
  tableColumn: object,
  tableRow: object,
  column: object,
  style: object,
  showSortingControls: bool,
  sortingEnabled: bool,
  sortingDirection: oneOf(['asc', 'desc', null]),
  onSort: func,
  showGroupingControls: bool,
  groupingEnabled: bool,
  onGroup: func,
  draggingEnabled: bool,
  resizingEnabled: bool,
  onWidthChange: func,
  onWidthDraft: func,
  onWidthDraftCancel: func,
  classes: object.isRequired,
  getMessage: func.isRequired,
  className: string,
  before: node
};

TableHeaderCellBase.defaultProps = {
  column: undefined,
  tableColumn: undefined,
  tableRow: undefined,
  style: null,
  showSortingControls: false,
  sortingDirection: undefined,
  sortingEnabled: false,
  onSort: undefined,
  showGroupingControls: false,
  groupingEnabled: false,
  onGroup: undefined,
  draggingEnabled: false,
  resizingEnabled: false,
  onWidthChange: undefined,
  onWidthDraft: undefined,
  onWidthDraftCancel: undefined,
  className: undefined,
  before: undefined
};

var TableHeaderCell = withStyles(styles$19, { name: 'TableHeaderCell' })(TableHeaderCellBase);

var defaultMessages$6 = {
  sortingHint: 'Sort'
};

var TableHeaderRow$1 = function (_React$PureComponent) {
  inherits(TableHeaderRow$$1, _React$PureComponent);

  function TableHeaderRow$$1() {
    classCallCheck(this, TableHeaderRow$$1);
    return possibleConstructorReturn(this, (TableHeaderRow$$1.__proto__ || Object.getPrototypeOf(TableHeaderRow$$1)).apply(this, arguments));
  }

  createClass(TableHeaderRow$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(TableHeaderRow, _extends({
        cellComponent: TableHeaderCell,
        rowComponent: TableRow$1,
        messages: _extends({}, defaultMessages$6, messages)
      }, restProps));
    }
  }]);
  return TableHeaderRow$$1;
}(PureComponent);

TableHeaderRow$1.Cell = TableHeaderCell;
TableHeaderRow$1.Row = TableRow$1;

TableHeaderRow$1.propTypes = {
  messages: shape({
    sortingHint: string
  })
};

TableHeaderRow$1.defaultProps = {
  messages: {}
};

var getBorderColor = function getBorderColor(theme) {
  return '1px solid ' + (theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.8));
};

var styles$23 = function styles$$1(theme) {
  return {
    cell: {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 3,
        borderLeft: 0
      },
      '&:last-child': {
        paddingRight: theme.spacing.unit * 3,
        borderRight: 0
      },
      height: theme.spacing.unit * 6,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      borderBottom: getBorderColor(theme),
      borderLeft: getBorderColor(theme),
      borderRight: getBorderColor(theme)
    }
  };
};

var CellBase = function CellBase(_ref) {
  var column = _ref.column,
    value = _ref.value,
    children = _ref.children,
    classes = _ref.classes,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    row = _ref.row,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['column', 'value', 'children', 'classes', 'tableRow', 'tableColumn', 'row', 'className']);
  return createElement(
    TableCell,
    _extends({
      className: classNames(classes.cell, className)
    }, restProps),
    children
  );
};

CellBase.propTypes = {
  value: any,
  column: object,
  row: object,
  classes: object.isRequired,
  children: node,
  tableRow: object,
  tableColumn: object,
  className: string
};

CellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined
};

var Cell = withStyles(styles$23, { name: 'Cell' })(CellBase);

var styles$24 = function styles$$1(theme) {
  return {
    headerCellBorder: {
      borderLeft: getBorderColor(theme),
      borderRight: getBorderColor(theme),
      borderTop: 'none',
      '&:first-child': {
        borderLeft: 0
      },
      '&:last-child': {
        borderRight: 0
      },
      verticalAlign: 'bottom',
      paddingBottom: theme.spacing.unit * 2
    }
  };
};

var BandedHeaderCellBase = function BandedHeaderCellBase(_ref) {
  var HeaderCellComponent = _ref.component,
    className = _ref.className,
    classes = _ref.classes,
    restProps = objectWithoutProperties(_ref, ['component', 'className', 'classes']);
  return createElement(HeaderCellComponent, _extends({
    className: classNames(classes.headerCellBorder, className)
  }, restProps));
};

BandedHeaderCellBase.propTypes = {
  component: func.isRequired,
  classes: object.isRequired,
  className: string
};

BandedHeaderCellBase.defaultProps = {
  className: undefined
};

var BandedHeaderCell = withStyles(styles$24, { name: 'BandedHeaderCell' })(BandedHeaderCellBase);

var styles$25 = {
  emptyCell: {
    display: 'none'
  }
};

var InvisibleCellBase = function InvisibleCellBase(_ref) {
  var classes = _ref.classes;
  return createElement(TableCell, { className: classes.emptyCell });
};

InvisibleCellBase.propTypes = {
  classes: object.isRequired
};

var InvisibleCell = withStyles(styles$25, { name: 'InvisibleCell' })(InvisibleCellBase);

var styles$26 = {
  row: {
    height: 'auto'
  }
};

var RowBase = function RowBase(_ref) {
  var children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    row = _ref.row,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    restProps = objectWithoutProperties(_ref, ['children', 'classes', 'className', 'row', 'tableRow', 'tableColumn']);
  return createElement(
    TableRow,
    _extends({
      className: classNames(classes.row, className)
    }, restProps),
    children
  );
};

RowBase.propTypes = {
  classes: object.isRequired,
  children: node,
  row: object,
  tableRow: object,
  tableColumn: object,
  className: string
};

RowBase.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined
};

var Row = withStyles(styles$26, { name: 'Row' })(RowBase);

var TableBandHeader$1 = function (_React$PureComponent) {
  inherits(TableBandHeader$$1, _React$PureComponent);

  function TableBandHeader$$1() {
    classCallCheck(this, TableBandHeader$$1);
    return possibleConstructorReturn(this, (TableBandHeader$$1.__proto__ || Object.getPrototypeOf(TableBandHeader$$1)).apply(this, arguments));
  }

  createClass(TableBandHeader$$1, [{
    key: 'render',
    value: function render() {
      return createElement(TableBandHeader, _extends({
        cellComponent: Cell,
        rowComponent: Row,
        bandedHeaderCellComponent: BandedHeaderCell,
        invisibleCellComponent: InvisibleCell
      }, this.props));
    }
  }]);
  return TableBandHeader$$1;
}(PureComponent);

TableBandHeader$1.Cell = Cell;
TableBandHeader$1.Row = Row;
TableBandHeader$1.BandedHeaderCell = BandedHeaderCell;

var styles$27 = function styles$$1(theme) {
  return {
    cell: {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
    },
    inputRoot: {
      width: '100%'
    },
    inputRight: {
      textAlign: 'right'
    },
    inputCenter: {
      textAlign: 'center'
    }
  };
};

var EditCellBase = function EditCellBase(_ref) {
  var _classNames;

  var column = _ref.column,
    value = _ref.value,
    onValueChange = _ref.onValueChange,
    style = _ref.style,
    classes = _ref.classes,
    children = _ref.children,
    row = _ref.row,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    editingEnabled = _ref.editingEnabled,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['column', 'value', 'onValueChange', 'style', 'classes', 'children', 'row', 'tableRow', 'tableColumn', 'editingEnabled', 'className']);

  var inputClasses = classNames((_classNames = {}, defineProperty(_classNames, classes.inputRight, tableColumn && tableColumn.align === 'right'), defineProperty(_classNames, classes.inputCenter, tableColumn && tableColumn.align === 'center'), _classNames));

  return createElement(
    TableCell,
    _extends({
      className: classNames(classes.cell, className),
      style: style
    }, restProps),
    children || createElement(Input, {
      className: classes.inputRoot,
      classes: { input: inputClasses },
      value: value || '',
      disabled: !editingEnabled,
      onChange: function onChange(e) {
        return onValueChange(e.target.value);
      }
    })
  );
};

EditCellBase.propTypes = {
  column: object,
  row: object,
  tableRow: object,
  tableColumn: object,
  value: any,
  onValueChange: func.isRequired,
  style: object,
  classes: object.isRequired,
  editingEnabled: bool,
  children: node,
  className: string
};

EditCellBase.defaultProps = {
  column: undefined,
  row: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  value: '',
  style: null,
  children: undefined,
  className: undefined,
  editingEnabled: true
};

var EditCell = withStyles(styles$27, { name: 'EditCell' })(EditCellBase);

var TableEditRow$1 = function (_React$PureComponent) {
  inherits(TableEditRow$$1, _React$PureComponent);

  function TableEditRow$$1() {
    classCallCheck(this, TableEditRow$$1);
    return possibleConstructorReturn(this, (TableEditRow$$1.__proto__ || Object.getPrototypeOf(TableEditRow$$1)).apply(this, arguments));
  }

  createClass(TableEditRow$$1, [{
    key: 'render',
    value: function render() {
      return createElement(TableEditRow, _extends({
        cellComponent: EditCell,
        rowComponent: TableRow$1
      }, this.props));
    }
  }]);
  return TableEditRow$$1;
}(PureComponent);

TableEditRow$1.Cell = EditCell;
TableEditRow$1.Row = TableRow$1;

var styles$28 = function styles$$1(theme) {
  return {
    button: {
      padding: theme.spacing.unit,
      minWidth: 40
    },
    headingCell: {
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: '0 ' + theme.spacing.unit * 2 + 'px 0 ' + theme.spacing.unit * 3 + 'px'
    },
    cell: {
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: '0 ' + theme.spacing.unit * 2 + 'px 0 ' + theme.spacing.unit * 3 + 'px'
    },
    alignWithRowSpan: {
      verticalAlign: 'bottom',
      paddingBottom: theme.spacing.unit * 1.25
    }
  };
};

var withEditColumnStyles = withStyles(styles$28, { name: 'EditColumn' });

var CommandButtonBase = function CommandButtonBase(_ref) {
  var onExecute = _ref.onExecute,
    text = _ref.text,
    classes = _ref.classes,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['onExecute', 'text', 'classes', 'className']);
  return createElement(
    Button,
    _extends({
      color: 'primary',
      className: classNames(classes.button, className),
      onClick: function onClick(e) {
        e.stopPropagation();
        onExecute();
      }
    }, restProps),
    text
  );
};
CommandButtonBase.propTypes = {
  onExecute: func.isRequired,
  text: string.isRequired,
  classes: object.isRequired,
  className: string
};

CommandButtonBase.defaultProps = {
  className: undefined
};

var CommandButton = withEditColumnStyles(CommandButtonBase);

var EditCommandHeadingCellBase = function EditCommandHeadingCellBase(_ref2) {
  var _classNames;

  var children = _ref2.children,
    style = _ref2.style,
    classes = _ref2.classes,
    className = _ref2.className,
    tableRow = _ref2.tableRow,
    tableColumn = _ref2.tableColumn,
    rowSpan = _ref2.rowSpan,
    restProps = objectWithoutProperties(_ref2, ['children', 'style', 'classes', 'className', 'tableRow', 'tableColumn', 'rowSpan']);
  return createElement(
    TableCell,
    _extends({
      className: classNames((_classNames = {}, defineProperty(_classNames, classes.headingCell, true), defineProperty(_classNames, classes.alignWithRowSpan, rowSpan > 1), _classNames), className),
      rowSpan: rowSpan
    }, restProps),
    children
  );
};

EditCommandHeadingCellBase.propTypes = {
  children: node,
  style: object,
  classes: object.isRequired,
  className: string,
  tableRow: object,
  tableColumn: object,
  rowSpan: number
};

EditCommandHeadingCellBase.defaultProps = {
  children: undefined,
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  rowSpan: undefined
};

var EditCommandHeadingCell = withEditColumnStyles(EditCommandHeadingCellBase);

var EditCommandCellBase = function EditCommandCellBase(_ref3) {
  var tableRow = _ref3.tableRow,
    tableColumn = _ref3.tableColumn,
    row = _ref3.row,
    children = _ref3.children,
    style = _ref3.style,
    classes = _ref3.classes,
    className = _ref3.className,
    restProps = objectWithoutProperties(_ref3, ['tableRow', 'tableColumn', 'row', 'children', 'style', 'classes', 'className']);
  return createElement(
    TableCell,
    _extends({
      className: classNames(classes.cell, className),
      style: style
    }, restProps),
    children
  );
};

EditCommandCellBase.propTypes = {
  children: node,
  style: object,
  classes: object.isRequired,
  className: string,
  tableRow: object,
  tableColumn: object,
  row: object
};

EditCommandCellBase.defaultProps = {
  children: undefined,
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  row: undefined
};

var EditCommandCell = withEditColumnStyles(EditCommandCellBase);

var defaultMessages$7 = {
  addCommand: 'New',
  editCommand: 'Edit',
  deleteCommand: 'Delete',
  commitCommand: 'Save',
  cancelCommand: 'Cancel'
};

var TableEditColumn$1 = function (_React$PureComponent) {
  inherits(TableEditColumn$$1, _React$PureComponent);

  function TableEditColumn$$1() {
    classCallCheck(this, TableEditColumn$$1);
    return possibleConstructorReturn(this, (TableEditColumn$$1.__proto__ || Object.getPrototypeOf(TableEditColumn$$1)).apply(this, arguments));
  }

  createClass(TableEditColumn$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(TableEditColumn, _extends({
        cellComponent: EditCommandCell,
        headerCellComponent: EditCommandHeadingCell,
        commandComponent: CommandButton,
        messages: _extends({}, defaultMessages$7, messages),
        width: 150
      }, restProps));
    }
  }]);
  return TableEditColumn$$1;
}(PureComponent);

TableEditColumn$1.Command = CommandButton;
TableEditColumn$1.Cell = EditCommandCell;
TableEditColumn$1.HeaderCell = EditCommandHeadingCell;

TableEditColumn$1.propTypes = {
  messages: shape({
    addCommand: string,
    editCommand: string,
    deleteCommand: string,
    commitCommand: string,
    cancelCommand: string
  })
};

TableEditColumn$1.defaultProps = {
  messages: {}
};

var styles$29 = function styles$$1(theme) {
  return {
    emptyMessage: {
      margin: '0 auto',
      padding: theme.spacing.unit * 5 + 'px 0',
      fontFamily: theme.typography.fontFamily,
      color: theme.typography.subheading.color,
      fontSize: theme.typography.subheading.fontSize
    }
  };
};

var EmptyMessageBase = function EmptyMessageBase(_ref) {
  var getMessage = _ref.getMessage,
    classes = _ref.classes,
    restProps = objectWithoutProperties(_ref, ['getMessage', 'classes']);
  return createElement(
    Toolbar$1,
    restProps,
    createElement(
      'big',
      { className: classes.emptyMessage },
      getMessage('noColumns')
    )
  );
};

EmptyMessageBase.propTypes = {
  getMessage: func.isRequired,
  classes: object.isRequired
};

var EmptyMessage = withStyles(styles$29, { name: 'EmptyMessage' })(EmptyMessageBase);

var defaultMessages$8 = {
  noColumns: 'Nothing to show'
};

var TableColumnVisibility$1 = function (_React$PureComponent) {
  inherits(TableColumnVisibility$$1, _React$PureComponent);

  function TableColumnVisibility$$1() {
    classCallCheck(this, TableColumnVisibility$$1);
    return possibleConstructorReturn(this, (TableColumnVisibility$$1.__proto__ || Object.getPrototypeOf(TableColumnVisibility$$1)).apply(this, arguments));
  }

  createClass(TableColumnVisibility$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);


      return createElement(TableColumnVisibility, _extends({
        emptyMessageComponent: EmptyMessage,
        messages: _extends({}, defaultMessages$8, messages)
      }, restProps));
    }
  }]);
  return TableColumnVisibility$$1;
}(PureComponent);

TableColumnVisibility$1.EmptyMessage = EmptyMessage;

TableColumnVisibility$1.propTypes = {
  messages: shape({
    noColumns: string
  })
};

TableColumnVisibility$1.defaultProps = {
  messages: {}
};

var TableReorderingCell = function TableReorderingCell(_ref) {
  var style = _ref.style,
    getCellDimensions = _ref.getCellDimensions;

  var refHandler = function refHandler(node$$1) {
    return node$$1 && getCellDimensions(function () {
      var _node$getBoundingClie = node$$1.getBoundingClientRect(),
        left = _node$getBoundingClie.left,
        right = _node$getBoundingClie.right;

      return { left: left, right: right };
    });
  };
  return createElement('td', {
    ref: refHandler,
    style: _extends({}, style, { padding: 0 })
  });
};

TableReorderingCell.propTypes = {
  getCellDimensions: func.isRequired,
  style: object
};

TableReorderingCell.defaultProps = {
  style: null
};

var TableContainer$1 = function TableContainer(_ref) {
  var onOver = _ref.onOver,
    onLeave = _ref.onLeave,
    onDrop = _ref.onDrop,
    children = _ref.children;
  return createElement(
    DropTarget,
    {
      onOver: onOver,
      onLeave: onLeave,
      onDrop: onDrop
    },
    children
  );
};

// eslint-disable-next-line react/prop-types
var ReorderingRow = function ReorderingRow(_ref2) {
  var style = _ref2.style,
    restParams = objectWithoutProperties(_ref2, ['style']);
  return createElement(TableRow$1, _extends({
    style: _extends({}, style, {
      visibility: 'hidden'
    })
  }, restParams));
};

var TableColumnReordering$1 = function TableColumnReordering$$1(props) {
  return createElement(TableColumnReordering, _extends({
    tableContainerComponent: TableContainer$1,
    rowComponent: ReorderingRow,
    cellComponent: TableReorderingCell
  }, props));
};

var TableColumnResizing$1 = function (_React$PureComponent) {
  inherits(TableColumnResizing$$1, _React$PureComponent);

  function TableColumnResizing$$1() {
    classCallCheck(this, TableColumnResizing$$1);
    return possibleConstructorReturn(this, (TableColumnResizing$$1.__proto__ || Object.getPrototypeOf(TableColumnResizing$$1)).apply(this, arguments));
  }

  createClass(TableColumnResizing$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        minColumnWidth = _props.minColumnWidth,
        restProps = objectWithoutProperties(_props, ['minColumnWidth']);

      return createElement(TableColumnResizing, _extends({}, restProps, {
        minColumnWidth: minColumnWidth
      }));
    }
  }]);
  return TableColumnResizing$$1;
}(PureComponent);

TableColumnResizing$1.propTypes = {
  minColumnWidth: number
};

TableColumnResizing$1.defaultProps = {
  minColumnWidth: 40
};

var styles$30 = function styles$$1(theme) {
  return {
    toolbar: {
      borderBottom: getBorderColor(theme)
    }
  };
};

var ToolbarBase = function ToolbarBase(_ref) {
  var children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    style = _ref.style,
    restProps = objectWithoutProperties(_ref, ['children', 'classes', 'className', 'style']);
  return createElement(
    Toolbar$1,
    _extends({
      style: style,
      className: classNames(classes.toolbar, className)
    }, restProps),
    children
  );
};

ToolbarBase.propTypes = {
  children: node.isRequired,
  classes: object.isRequired,
  className: string,
  style: object
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null
};

var Toolbar$3 = withStyles(styles$30, { name: 'Toolbar' })(ToolbarBase);

var FlexibleSpace = function FlexibleSpace() {
  return createElement('div', { style: { flex: '0 0 0', marginLeft: 'auto' } });
};

var Toolbar$2 = function (_React$PureComponent) {
  inherits(Toolbar$$1, _React$PureComponent);

  function Toolbar$$1() {
    classCallCheck(this, Toolbar$$1);
    return possibleConstructorReturn(this, (Toolbar$$1.__proto__ || Object.getPrototypeOf(Toolbar$$1)).apply(this, arguments));
  }

  createClass(Toolbar$$1, [{
    key: 'render',
    value: function render() {
      return createElement(Toolbar, _extends({
        rootComponent: Toolbar$3,
        flexibleSpaceComponent: FlexibleSpace
      }, this.props));
    }
  }]);
  return Toolbar$$1;
}(PureComponent);

Toolbar$2.Root = Toolbar$3;

var styles$31 = function styles$$1(theme) {
  return {
    button: {
      marginTop: '-1px',
      marginBottom: '-1px',
      marginLeft: -theme.spacing.unit,
      marginRight: theme.spacing.unit * 2,
      width: theme.spacing.unit * 5,
      height: theme.spacing.unit * 5
    },
    hidden: {
      cursor: 'default',
      opacity: 0
    }
  };
};

var TableTreeExpandButtonBase = function TableTreeExpandButtonBase(_ref) {
  var _classNames;

  var visible = _ref.visible,
    expanded = _ref.expanded,
    classes = _ref.classes,
    onToggle = _ref.onToggle,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['visible', 'expanded', 'classes', 'onToggle', 'className']);
  return createElement(
    IconButton,
    _extends({
      className: classNames((_classNames = {}, defineProperty(_classNames, classes.button, true), defineProperty(_classNames, classes.hidden, !visible), _classNames), className),
      onClick: function onClick(e) {
        if (!visible) return;
        e.stopPropagation();
        onToggle();
      },
      tabIndex: visible ? 0 : -1
    }, restProps),
    expanded ? createElement(ExpandMore, null) : createElement(ChevronRight, null)
  );
};

TableTreeExpandButtonBase.propTypes = {
  visible: bool,
  expanded: bool,
  onToggle: func,
  className: string,
  classes: object.isRequired
};

TableTreeExpandButtonBase.defaultProps = {
  visible: false,
  expanded: false,
  onToggle: function onToggle() { },
  className: undefined
};

var TableTreeExpandButton = withStyles(styles$31)(TableTreeExpandButtonBase);

var styles$32 = function styles$$1(theme) {
  return {
    checkbox: {
      marginTop: '-1px',
      marginBottom: '-1px',
      marginRight: theme.spacing.unit * 2,
      marginLeft: -theme.spacing.unit * 2,
      width: theme.spacing.unit * 5,
      height: theme.spacing.unit * 5
    }
  };
};

var TableTreeCheckboxBase = function TableTreeCheckboxBase(_ref) {
  var disabled = _ref.disabled,
    checked = _ref.checked,
    indeterminate = _ref.indeterminate,
    onChange = _ref.onChange,
    classes = _ref.classes,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['disabled', 'checked', 'indeterminate', 'onChange', 'classes', 'className']);
  return createElement(Checkbox, _extends({
    className: classNames(classes.checkbox, className),
    checked: checked,
    indeterminate: indeterminate,
    disabled: disabled,
    onClick: function onClick(e) {
      if (disabled) return;
      e.stopPropagation();
      onChange();
    }
  }, restProps));
};

TableTreeCheckboxBase.propTypes = {
  disabled: bool,
  checked: bool,
  indeterminate: bool,
  onChange: func,
  classes: object.isRequired,
  className: string
};

TableTreeCheckboxBase.defaultProps = {
  disabled: false,
  checked: false,
  indeterminate: false,
  onChange: function onChange() { },
  className: undefined
};

var TableTreeCheckbox = withStyles(styles$32)(TableTreeCheckboxBase);

var styles$33 = function styles$$1(theme) {
  return {
    indent: {
      marginLeft: theme.spacing.unit * 3
    }
  };
};

var TableTreeIndentBase = function TableTreeIndentBase(_ref) {
  var level = _ref.level,
    classes = _ref.classes;
  return Array.from({ length: level }).map(function (value, currentLevel) {
    return createElement('span', {
      // eslint-disable-next-line react/no-array-index-key
      key: currentLevel,
      className: classes.indent
    });
  });
};

TableTreeIndentBase.propTypes = {
  level: number,
  classes: object.isRequired
};

TableTreeIndentBase.defaultProps = {
  level: 0
};

var TableTreeIndent = withStyles(styles$33)(TableTreeIndentBase);

var styles$34 = function styles$$1() {
  return {
    content: {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  };
};

var TableTreeContentBase = function TableTreeContentBase(_ref) {
  var children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['children', 'classes', 'className']);
  return createElement(
    'div',
    _extends({
      className: classNames(defineProperty({}, classes.content, true), className)
    }, restProps),
    children
  );
};

TableTreeContentBase.propTypes = {
  classes: object.isRequired,
  children: node,
  className: string
};

TableTreeContentBase.defaultProps = {
  children: undefined,
  className: undefined
};

var TableTreeContent = withStyles(styles$34)(TableTreeContentBase);

var styles$35 = function styles$$1(theme) {
  return {
    cell: {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 3
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  };
};

var TableTreeCellBase = function TableTreeCellBase(_ref) {
  var column = _ref.column,
    value = _ref.value,
    children = _ref.children,
    classes = _ref.classes,
    tableRow = _ref.tableRow,
    tableColumn = _ref.tableColumn,
    row = _ref.row,
    className = _ref.className,
    restProps = objectWithoutProperties(_ref, ['column', 'value', 'children', 'classes', 'tableRow', 'tableColumn', 'row', 'className']);
  return createElement(
    TableCell,
    _extends({
      className: classNames(defineProperty({}, classes.cell, true), className)
    }, restProps),
    createElement(
      'div',
      { className: classes.container },
      children
    )
  );
};

TableTreeCellBase.propTypes = {
  value: any,
  column: object,
  row: object,
  classes: object.isRequired,
  children: node,
  tableRow: object,
  tableColumn: object,
  className: string
};

TableTreeCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined
};

var TableTreeCell = withStyles(styles$35)(TableTreeCellBase);

var TableTreeColumn$1 = function (_React$PureComponent) {
  inherits(TableTreeColumn$$1, _React$PureComponent);

  function TableTreeColumn$$1() {
    classCallCheck(this, TableTreeColumn$$1);
    return possibleConstructorReturn(this, (TableTreeColumn$$1.__proto__ || Object.getPrototypeOf(TableTreeColumn$$1)).apply(this, arguments));
  }

  createClass(TableTreeColumn$$1, [{
    key: 'render',
    value: function render() {
      return createElement(TableTreeColumn, _extends({
        cellComponent: TableTreeCell,
        indentComponent: TableTreeIndent,
        expandButtonComponent: TableTreeExpandButton,
        checkboxComponent: TableTreeCheckbox,
        contentComponent: TableTreeContent
      }, this.props));
    }
  }]);
  return TableTreeColumn$$1;
}(PureComponent);

TableTreeColumn$1.Cell = TableTreeCell;
TableTreeColumn$1.Indent = TableTreeIndent;
TableTreeColumn$1.ExpandButton = TableTreeExpandButton;
TableTreeColumn$1.Checkbox = TableTreeCheckbox;
TableTreeColumn$1.Content = TableTreeContent;

var styles$36 = function styles$$1(theme) {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.action.active
    }
  };
};

var SearchPanelInputBase = function SearchPanelInputBase(_ref) {
  var onValueChange = _ref.onValueChange,
    value = _ref.value,
    getMessage = _ref.getMessage,
    restProps = objectWithoutProperties(_ref, ['onValueChange', 'value', 'getMessage']);
  return createElement(Input, _extends({
    onChange: function onChange(e) {
      return onValueChange(e.target.value);
    },
    value: value,
    type: 'text',
    placeholder: getMessage('searchPlaceholder')
  }, restProps, {
      startAdornment: createElement(
        InputAdornment,
        { position: 'start' },
        createElement(Search, null)
      )
    }));
};

SearchPanelInputBase.propTypes = {
  onValueChange: func.isRequired,
  value: string,
  getMessage: func.isRequired
};
SearchPanelInputBase.defaultProps = {
  value: ''
};

var SearchPanelInput = withStyles(styles$36)(SearchPanelInputBase);

var defaultMessages$9 = {
  searchPlaceholder: 'Search...'
};

var SearchPanel$1 = function (_React$PureComponent) {
  inherits(SearchPanel$$1, _React$PureComponent);

  function SearchPanel$$1() {
    classCallCheck(this, SearchPanel$$1);
    return possibleConstructorReturn(this, (SearchPanel$$1.__proto__ || Object.getPrototypeOf(SearchPanel$$1)).apply(this, arguments));
  }

  createClass(SearchPanel$$1, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
        messages = _props.messages,
        restProps = objectWithoutProperties(_props, ['messages']);

      return createElement(SearchPanel, _extends({
        inputComponent: SearchPanelInput,
        messages: _extends({}, defaultMessages$9, messages)
      }, restProps));
    }
  }]);
  return SearchPanel$$1;
}(PureComponent);

SearchPanel$1.Input = SearchPanelInput;

SearchPanel$1.propTypes = {
  messages: shape({
    searchPlaceholder: string
  })
};

SearchPanel$1.defaultProps = {
  messages: {}
};

export { Grid$1 as Grid, ColumnChooser$1 as ColumnChooser, DragDropProvider$1 as DragDropProvider, PagingPanel$1 as PagingPanel, GroupingPanel$1 as GroupingPanel, TableRowDetail$1 as TableRowDetail, TableGroupRow$1 as TableGroupRow, TableSelection$1 as TableSelection, Table$1 as Table, VirtualTable, TableFilterRow$1 as TableFilterRow, TableHeaderRow$1 as TableHeaderRow, TableBandHeader$1 as TableBandHeader, TableEditRow$1 as TableEditRow, TableEditColumn$1 as TableEditColumn, TableColumnVisibility$1 as TableColumnVisibility, TableColumnReordering$1 as TableColumnReordering, TableColumnResizing$1 as TableColumnResizing, Toolbar$2 as Toolbar, TableTreeColumn$1 as TableTreeColumn, SearchPanel$1 as SearchPanel };
//# sourceMappingURL=dx-react-grid-@material-ui/core.es.js.map
