import { q as is_array, W as get_prototype_of, X as object_prototype, Y as current_component, Z as slot, _ as noop, R as setContext, T as getContext, $ as spread_attributes, a0 as stringify, a1 as bind_props, S as pop, Q as push, a2 as element, a3 as attr, V as escape_html, a4 as add_styles, a5 as copy_payload, a6 as assign_payload, a7 as ensure_array_like, a8 as store_get, a9 as unsubscribe_stores } from "../../chunks/index.js";
import { w as writable } from "../../chunks/exports.js";
import * as accordion from "@zag-js/accordion";
import { subscribe, snapshot as snapshot$1 } from "@zag-js/core";
import { createNormalizer } from "@zag-js/types";
import * as radio from "@zag-js/radio-group";
import * as tabs from "@zag-js/tabs";
const empty = [];
function snapshot(value, skip_warning = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty);
}
function clone(value, cloned, path, paths, original = null) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element2 = value[i];
        if (i in value) {
          copy[i] = clone(element2, cloned, path, paths);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key2 in value) {
        copy[key2] = clone(value[key2], cloned, path, paths);
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function") {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function Header($$payload) {
  $$payload.out += `<header class="flex flex-col relative"><div class="items-center max-w-screen-xl mx-auto w-full p-4 py-6"><h1 class="text-center text-4xl font-extrabold">Clock-In Web App</h1></div></header>`;
}
function Wrapper($$payload, $$props) {
  $$payload.out += `<section class="flex flex-col px-4 max-w-screen-xl mx-auto w-full"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></section>`;
}
function get(key2, parse = JSON.parse) {
  try {
    return parse(sessionStorage[key2]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
if (is_legacy) {
  ({
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL("https://example.com")
  });
}
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const propMap = {
  className: "class",
  defaultChecked: "checked",
  defaultValue: "value",
  htmlFor: "for",
  onBlur: "onfocusout",
  onChange: "oninput",
  onFocus: "onfocusin",
  onDoubleClick: "ondblclick"
};
function toStyleString(style) {
  let string = "";
  for (let key2 in style) {
    const value = style[key2];
    if (value === null || value === void 0)
      continue;
    if (!key2.startsWith("--"))
      key2 = key2.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    string += `${key2}:${value};`;
  }
  return string;
}
function toSvelteProp(key2) {
  if (key2 in propMap)
    return propMap[key2];
  return key2.toLowerCase();
}
function toSveltePropValue(key2, value) {
  if (key2 === "style" && typeof value === "object")
    return toStyleString(value);
  if (value === false)
    return;
  return value;
}
const normalizeProps = createNormalizer((props) => {
  const normalized = {};
  for (const key2 in props) {
    normalized[toSvelteProp(key2)] = toSveltePropValue(key2, props[key2]);
  }
  return normalized;
});
const isFunction = (value) => typeof value === "function";
function reflect(obj) {
  return new Proxy(obj(), {
    get(_, prop) {
      const target = obj();
      let value = Reflect.get(target, prop);
      return isFunction(value) ? value.bind(target) : value;
    }
  });
}
function useSnapshot(service) {
  let state = service.state;
  const unsubscribe = subscribe(service.state, () => {
    state = snapshot$1(service.state);
  });
  onDestroy(unsubscribe);
  return reflect(() => state);
}
function useService(machine, options) {
  const { actions, context, state: hydratedState } = options ?? {};
  const service = typeof machine === "function" ? machine() : machine;
  const contextSnapshot = context;
  service.setContext(contextSnapshot);
  service._created();
  return service;
}
function useMachine(machine, options) {
  const service = useService(machine, options);
  const state = useSnapshot(service);
  return [state, service.send, service];
}
const useId = /* @__PURE__ */ (() => {
  let id = 0;
  return () => Math.random().toString(36).substring(2) + id++;
})();
function createContext(defaultValue) {
  const key2 = Symbol();
  const set = (value) => setContext(key2, value);
  const get2 = () => getContext(key2) ?? defaultValue;
  return [set, get2, key2];
}
const [setAccordionContext, getAccordionContext, key$3] = createContext();
function Accordion($$payload, $$props) {
  push();
  let {
    value = [],
    animDuration = 200,
    // Root
    base = "",
    padding = "",
    spaceY = "space-y-2",
    rounded = "rounded",
    width = "w-full",
    classes = "",
    // Snippets
    children,
    iconOpen,
    iconClosed,
    $$slots,
    $$events,
    ...zagProps
  } = $$props;
  const [snapshot$12, send] = useMachine(
    accordion.machine({
      id: useId(),
      onValueChange(details) {
        value = details.value;
      }
    }),
    {
      context: {
        ...zagProps,
        get value() {
          return snapshot(value);
        }
      }
    }
  );
  const api = accordion.connect(snapshot$12, send, normalizeProps);
  setAccordionContext({
    get api() {
      return api;
    },
    get animDuration() {
      return animDuration;
    },
    get iconClosed() {
      return iconClosed;
    },
    get iconOpen() {
      return iconOpen;
    }
  });
  $$payload.out += `<div${spread_attributes({
    class: `${stringify(base)} ${stringify(padding)} ${stringify(spaceY)} ${stringify(rounded)} ${stringify(width)} ${stringify(classes)}`,
    ...api.getRootProps(),
    "data-testid": "accordion"
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { value });
  pop();
}
function AccordionItem($$payload, $$props) {
  push();
  const {
    headingElement = "h3",
    // Root
    base,
    spaceY,
    classes,
    // Control
    controlBase = "flex text-start items-center space-x-4 w-full",
    controlHover = "hover:preset-tonal-primary",
    controlPadding = "py-2 px-4",
    controlRounded = "rounded",
    controlClasses,
    // Lead
    leadBase = "",
    leadClasses = "",
    // Content
    contentBase = "flex-1",
    contentClasses = "",
    // Indicator
    indicatorBase = "",
    indicatorClasses = "",
    // Panel
    panelBase,
    panelPadding = "py-2 px-4",
    panelRounded,
    panelClasses,
    // Snippets
    control,
    lead,
    panel,
    $$slots,
    $$events,
    ...zagProps
  } = $$props;
  const ctx = getAccordionContext();
  $$payload.out += `<div${spread_attributes({
    class: `${stringify(base)} ${stringify(spaceY)} ${stringify(classes)}`,
    ...ctx.api.getItemProps(zagProps),
    "data-testid": "accordion-item"
  })}>`;
  element($$payload, headingElement, void 0, () => {
    $$payload.out += `<button${spread_attributes({
      class: `${stringify(controlBase)} ${stringify(controlHover)} ${stringify(controlPadding)} ${stringify(controlRounded)} ${stringify(controlClasses)}`,
      ...ctx.api.getItemTriggerProps(zagProps),
      "data-testid": "accordion-control"
    })}>`;
    if (lead) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr("class", `${stringify(leadBase)} ${stringify(leadClasses)}`)} data-testid="accordion-lead">`;
      lead($$payload);
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div${attr("class", `${stringify(contentBase)} ${stringify(contentClasses)}`)} data-testid="accordion-control">`;
    control($$payload);
    $$payload.out += `<!----></div> <div${attr("class", `${stringify(indicatorBase)} ${stringify(indicatorClasses)}`)} data-testid="accordion-indicator">`;
    if (ctx.api.value.includes(zagProps.value)) {
      $$payload.out += "<!--[-->";
      if (ctx.iconOpen) {
        $$payload.out += "<!--[-->";
        ctx.iconOpen($$payload);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `−`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      if (ctx.iconClosed) {
        $$payload.out += "<!--[-->";
        ctx.iconClosed($$payload);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `+`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></button>`;
  });
  $$payload.out += ` `;
  if (ctx.api.value.includes(zagProps.value)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes({
      class: `${stringify(panelBase)} ${stringify(panelPadding)} ${stringify(panelRounded)} ${stringify(panelClasses)}`,
      ...ctx.api.getItemContentProps(zagProps),
      "data-testid": "accordion-panel"
    })}>`;
    panel?.($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
Object.assign(Accordion, { Item: AccordionItem });
const [setNavigationContext, getNavigationContext, key$2] = createContext({
  parent: "none",
  value: "",
  expanded: false,
  onSelectionHandler: () => {
  }
});
function NavBar($$payload, $$props) {
  push();
  let {
    value = "",
    // Root
    base = "h-full flex flex-col",
    background = "preset-filled-surface-100-900",
    width = "min-w-[320px] w-full",
    height = "h-20",
    padding = "p-1",
    classes = "",
    // Tiles
    tilesBase = "flex-1 flex",
    tilesFlexDirection = "",
    tilesJustify = "justify-center",
    tilesItems = "items-center",
    tilesGap = "gap-1",
    tilesClasses = "",
    // Events
    onchange,
    // Snippets
    children
  } = $$props;
  function onSelectionHandler(id) {
    value = id;
    if (onchange) onchange(id);
  }
  setNavigationContext({
    parent: "bar",
    get value() {
      return value;
    },
    expanded: false,
    onSelectionHandler
  });
  $$payload.out += `<aside${attr("class", `${stringify(base)} ${stringify(background)} ${stringify(width)} ${stringify(height)} ${stringify(padding)} ${stringify(classes)}`)} data-testid="nav-bar">`;
  if (children) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<nav${attr("class", `${stringify(tilesBase)} ${stringify(tilesFlexDirection)} ${stringify(tilesJustify)} ${stringify(tilesItems)} ${stringify(tilesGap)} ${stringify(tilesClasses)}`)} data-testid="nav-bar-tileset">`;
    children($$payload);
    $$payload.out += `<!----></nav>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></aside>`;
  bind_props($$props, { value });
  pop();
}
function NavRail($$payload, $$props) {
  push();
  let {
    value = "",
    expanded = false,
    // Root
    base = "h-full flex flex-col",
    background = "preset-filled-surface-100-900",
    padding = "p-1",
    width = "w-24",
    widthExpanded = "w-64",
    height = "h-full",
    classes = "",
    // Header
    headerBase = "flex",
    headerFlexDirection = "flex-col",
    headerJustify = "justify-center",
    headerItems = "items-center",
    headerGap = "gap-1",
    headerClasses = "",
    // Tiles
    tilesBase = "flex-1 flex",
    tilesFlexDirection = "flex-col",
    tilesJustify = "justify-center",
    tilesItems = "items-center",
    tilesGap = "gap-1",
    tilesClasses = "",
    // Footer
    footerBase = "flex",
    footerFlexDirection = "flex-col",
    footerJustify = "justify-center",
    footerItems = "items-center",
    footerGap = "gap-1",
    footerClasses = "",
    // Events
    onchange,
    // Snippets
    header,
    tiles,
    footer
  } = $$props;
  function onSelectionHandler(id) {
    value = id;
    if (onchange) onchange(id);
  }
  setNavigationContext({
    parent: "rail",
    get value() {
      return value;
    },
    get expanded() {
      return expanded;
    },
    onSelectionHandler
  });
  let rxWidth = expanded ? widthExpanded : width;
  $$payload.out += `<aside${attr("class", `${stringify(base)} ${stringify(background)} ${stringify(height)} ${stringify(padding)} ${stringify(rxWidth)} ${stringify(classes)}`)} data-testid="nav-rail">`;
  if (header) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<header${attr("class", `${stringify(headerBase)} ${stringify(headerFlexDirection)} ${stringify(headerJustify)} ${stringify(headerItems)} ${stringify(headerGap)} ${stringify(headerClasses)}`)} data-testid="nav-rail-header">`;
    header($$payload);
    $$payload.out += `<!----></header>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (tiles) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<nav${attr("class", `${stringify(tilesBase)} ${stringify(tilesFlexDirection)} ${stringify(tilesJustify)} ${stringify(tilesItems)} ${stringify(tilesGap)} ${stringify(tilesClasses)}`)} data-testid="nav-rail-tiles">`;
    tiles($$payload);
    $$payload.out += `<!----></nav>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (footer) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<footer${attr("class", `${stringify(footerBase)} ${stringify(footerFlexDirection)} ${stringify(footerJustify)} ${stringify(footerItems)} ${stringify(footerGap)} ${stringify(footerClasses)}`)} data-testid="nav-rail-footer">`;
    footer($$payload);
    $$payload.out += `<!----></footer>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></aside>`;
  bind_props($$props, { value });
  pop();
}
function NavTile($$payload, $$props) {
  push();
  let {
    id,
    href,
    target,
    label,
    labelExpanded,
    title,
    selected = false,
    type = "button",
    // Root
    base = "flex items-center",
    width = "w-full",
    aspect = "aspect-square",
    background = "",
    hover = "hover:preset-filled-surface-50-950",
    active = "preset-filled-primary-500",
    padding = "p-2",
    gap = "gap-1",
    rounded = "rounded-container",
    classes = "flex-col justify-center",
    // Expanded
    expandedPadding = "py-3 px-4",
    expandedGap = "gap-4",
    expandedClasses = "",
    // Label (base)
    labelBase = "type-scale-1",
    labelClasses = "",
    // Label (expanded)
    labelExpandedBase = "",
    labelExpandedClasses = "",
    // Events
    onclick,
    // Snippets
    children
  } = $$props;
  const ctx = getNavigationContext();
  const element$1 = href ? "a" : "button";
  const role = href ? void 0 : "button";
  const rxSize = ctx.parent === "bar" ? `h-full` : `${aspect}`;
  const classesCollapsed = `${rxSize} ${padding} ${gap} ${classes}`;
  const classesExtended = `${expandedPadding} ${expandedGap} ${expandedClasses}`;
  const rxMode = ctx.expanded ? classesExtended : classesCollapsed;
  const rxBackground = selected || ctx.value === id ? active : `${background} ${hover}`;
  element(
    $$payload,
    element$1,
    () => {
      $$payload.out += `${attr("class", `${stringify(base)} ${stringify(width)} ${stringify(rounded)} ${stringify(rxBackground)} ${stringify(rxMode)}`)}${attr("href", href)}${attr("target", target)}${attr("type", element$1 === "button" ? type : void 0)}${attr("title", title)}${attr("role", role)} tabindex="0" data-testid="nav-tile"`;
    },
    () => {
      if (children) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div>`;
        children($$payload);
        $$payload.out += `<!----></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (label && !ctx.expanded) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${attr("class", `${stringify(labelBase)} ${stringify(labelClasses)}`)} data-testid="nav-tile-label">${escape_html(label)}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (labelExpanded && ctx.expanded) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${attr("class", `${stringify(labelExpandedBase)} ${stringify(labelExpandedClasses)}`)} data-testid="nav-tile-label-expanded">${escape_html(labelExpanded)}</div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
  );
  pop();
}
Object.assign(NavRail, { Rail: NavRail, Bar: NavBar, Tile: NavTile });
const [setSegmentContext, getSegmentContext, key$1] = createContext({
  api: {},
  indicatorText: ""
});
function Segment($$payload, $$props) {
  push();
  let {
    value = "",
    orientation = "horizontal",
    // Root
    base = "inline-flex items-stretch overflow-hidden",
    background = "preset-outlined-surface-200-800",
    border = "p-2",
    gap = "gap-2",
    padding = "",
    rounded = "rounded-container",
    width = "",
    classes = "",
    // States
    orientVertical = "flex-col",
    orientHorizontal = "flex-row",
    stateDisabled = "disabled",
    stateReadOnly = "pointer-events-none",
    // Indicator
    indicatorBase = "top-[var(--top)] left-[var(--left)] w-[var(--width)] h-[var(--height)]",
    indicatorBg = "preset-filled",
    indicatorText = "text-surface-contrast-950 dark:text-surface-contrast-50",
    indicatorRounded = "rounded",
    indicatorClasses = "",
    // Snippets
    children,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const [snapshot2, send] = useMachine(
    radio.machine({
      id: useId(),
      onValueChange(details) {
        value = details.value;
      },
      orientation
    }),
    {
      context: {
        ...zagProps,
        get value() {
          return value;
        }
      }
    }
  );
  const api = radio.connect(snapshot2, send, normalizeProps);
  setSegmentContext({
    get api() {
      return api;
    },
    get indicatorText() {
      return indicatorText;
    }
  });
  const rxOrientation = snapshot2.context.orientation === "vertical" ? orientVertical : orientHorizontal;
  const rxDisabled = snapshot2.context.disabled ? stateDisabled : "";
  const rxReadOnly = snapshot2.context.readOnly ? stateReadOnly : "";
  $$payload.out += `<div${spread_attributes({
    ...api.getRootProps(),
    class: `${stringify(base)} ${stringify(rxOrientation)} ${stringify(background)} ${stringify(border)} ${stringify(padding)} ${stringify(gap)} ${stringify(rounded)} ${stringify(width)} ${stringify(rxDisabled)} ${stringify(rxReadOnly)} ${stringify(classes)}`,
    "data-testid": "segment"
  })}><div${spread_attributes({
    ...api.getIndicatorProps(),
    class: `${stringify(indicatorBase)} ${stringify(indicatorBg)} ${stringify(indicatorRounded)} ${stringify(indicatorClasses)}`,
    "data-testid": "segment-indicator"
  })}></div> `;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { value });
  pop();
}
function SegmentItem($$payload, $$props) {
  push();
  let {
    // Root
    base = "btn cursor-pointer z-[1]",
    classes = "",
    // State
    stateDisabled = "disabled",
    stateFocused = "focused",
    // Label
    labelBase = "pointer-events-none transition-colors duration-100",
    labelClasses = "",
    // Snippets
    children,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const ctx = getSegmentContext();
  const state = ctx.api.getItemState(zagProps);
  const rxDisabled = state.disabled ? stateDisabled : "";
  const rxActiveText = state.checked ? ctx.indicatorText : "";
  const rxFocused = state.focused ? stateFocused : "";
  $$payload.out += `<label${spread_attributes({
    ...ctx.api.getItemProps(zagProps),
    class: `${stringify(base)} ${stringify(rxDisabled)} ${stringify(rxFocused)} ${stringify(classes)}`,
    "data-testid": "segment-item"
  })}><span${spread_attributes({
    ...ctx.api.getItemTextProps(zagProps),
    class: `${stringify(labelBase)} ${stringify(rxActiveText)} ${stringify(labelClasses)}`,
    "data-testid": "segment-item-label"
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></span> <input${spread_attributes({
    ...ctx.api.getItemHiddenInputProps(zagProps),
    "data-testid": "segment-item-input"
  })}></label>`;
  pop();
}
Object.assign(Segment, { Item: SegmentItem });
const [setTabContext, getTabContext, key] = createContext({
  fluid: false,
  api: {}
});
function Tabs$1($$payload, $$props) {
  push();
  let {
    value = "",
    fluid = false,
    // Root
    base = "w-full",
    classes = "",
    // List
    listBase = "flex",
    listJustify = "justify-start",
    listBorder = "border-b-[1px] border-surface-200-800",
    listMargin = "mb-4",
    listGap = "gap-2",
    listClasses = "",
    // Content
    contentBase = "",
    contentClasses = "",
    // Snippets
    list,
    content,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const [snapshot2, send] = useMachine(
    tabs.machine({
      id: useId(),
      onValueChange(details) {
        value = details.value;
      }
    }),
    {
      context: {
        ...zagProps,
        get value() {
          return value;
        }
      }
    }
  );
  const api = tabs.connect(snapshot2, send, normalizeProps);
  setTabContext({
    get api() {
      return api;
    },
    get fluid() {
      return fluid;
    }
  });
  $$payload.out += `<div${spread_attributes({
    ...api.getRootProps(),
    class: `${stringify(base)} ${stringify(classes)}`,
    "data-testid": "tabs"
  })}><div${spread_attributes({
    ...api.getListProps(),
    class: `${stringify(listBase)} ${stringify(listJustify)} ${stringify(listBorder)} ${stringify(listMargin)} ${stringify(listGap)} ${stringify(listClasses)}`,
    "data-testid": "tabs-list"
  })}>`;
  list?.($$payload);
  $$payload.out += `<!----></div> <div${attr("class", `${stringify(contentBase)} ${stringify(contentClasses)}`)} data-testid="tabs-content">`;
  content?.($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { value });
  pop();
}
function TabsControl($$payload, $$props) {
  push();
  let {
    // Root
    base = "border-b-[1px] border-transparent",
    padding = "pb-2",
    translateX = "translate-y-[1px]",
    classes = "",
    // Label
    labelBase = "btn hover:preset-tonal-primary",
    labelClasses = "",
    // State
    stateInactive = "[&:not(:hover)]:opacity-50",
    stateActive = "border-surface-950-50 opacity-100",
    stateLabelInactive = "",
    stateLabelActive = "",
    // Snippets
    lead,
    children,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const ctx = getTabContext();
  const state = ctx.api.getTriggerState(zagProps);
  const rxActive = state.selected ? stateActive : stateInactive;
  const rxLabelActive = state.selected ? stateLabelActive : stateLabelInactive;
  const commonWidth = ctx.fluid ? "100%" : "";
  $$payload.out += `<button${spread_attributes(
    {
      ...ctx.api.getTriggerProps(zagProps),
      class: `${stringify(base)} ${stringify(padding)} ${stringify(translateX)} ${stringify(rxActive)} ${stringify(classes)}`,
      "data-testid": "tabs-control"
    },
    void 0,
    { width: commonWidth }
  )}><div${add_styles({ width: commonWidth })}${attr("class", `${stringify(labelBase)} ${stringify(rxLabelActive)} ${stringify(labelClasses)}`)} data-testid="tabs-control-label">`;
  if (lead) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span>`;
    lead($$payload);
    $$payload.out += `<!----></span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span>`;
  children?.($$payload);
  $$payload.out += `<!----></span></div></button>`;
  pop();
}
function TabsPanel($$payload, $$props) {
  push();
  let {
    // Root
    base = "",
    classes = "",
    // Children
    children,
    $$slots,
    $$events,
    // Zag
    ...zagProps
  } = $$props;
  const ctx = getTabContext();
  $$payload.out += `<div${spread_attributes({
    ...ctx.api.getContentProps(zagProps),
    class: `${stringify(base)} ${stringify(classes)}`,
    "data-testid": "tabs-panel"
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
const Tabs = Object.assign(Tabs$1, { Control: TabsControl, Panel: TabsPanel });
function Content($$payload, $$props) {
  push();
  var $$store_subs;
  let group = "Input";
  let firstName = "";
  let lastName = "";
  let id = "";
  function formatTime(input) {
    if (input == null) {
      return input;
    } else {
      let newFormat = input.substring(0, 10) + "@" + input.substring(11, 19);
      return newFormat;
    }
  }
  const employeeDB = writable([]);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 w-5/6 h-full p-4 text-center py-6 justify-self-center">`;
    {
      let list = function($$payload3) {
        $$payload3.out += `<!---->`;
        Tabs.Control($$payload3, {
          value: "Input",
          children: ($$payload4) => {
            $$payload4.out += `<!---->Clock-In/ Clock-Out`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Tabs.Control($$payload3, {
          value: "Database",
          children: ($$payload4) => {
            $$payload4.out += `<!---->Database`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      }, content = function($$payload3) {
        $$payload3.out += `<!---->`;
        Tabs.Panel($$payload3, {
          value: "Input",
          children: ($$payload4) => {
            $$payload4.out += `<div class="space-y-8 w-1/3 justify-self-center"><div class="gap-6"><label class="EmployeeID"><h6 class="h6 pb-2">Employee ID</h6> <input class="input svelte-1q4te82" type="text" placeholder="Employee ID" maxlength="6"${attr("value", id)} id="idInputField"></label></div> <div class="gap-6"><label class="FirstName"><h6 class="h6 pb-2">First Name</h6> <input${attr("value", firstName)} class="input svelte-1q4te82" type="text" placeholder="First Name" id="firstNameInputField"></label></div> <div class="gap-6"><label class="LastName"><h6 class="h6 pb-2">Last Name</h6> <input${attr("value", lastName)} class="input svelte-1q4te82" type="text" placeholder="Last Name" id="lastNameInputField"></label></div> <div class="gap-6 gap-x-8 flex justify-self-center"><button type="submit" class="btn preset-filled-surface-500">Clock-In</button> <button type="button" class="btn preset-filled-surface-500">Clock-Out</button></div></div>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Tabs.Panel($$payload3, {
          value: "Database",
          children: ($$payload4) => {
            const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$employeeDB", employeeDB));
            $$payload4.out += `<div class="justify-self-center max-w-auto"><table class="table table-auto border-collapse caption-top"><caption>Employee Timesheet Database</caption><thead><tr><th>Id</th><th>First Name</th><th>Last Name</th><th>Clock-In Time</th><th>Clock-Out Time</th></tr></thead><tbody class="hover:[&amp;>tr]:preset-tonal-primary"><!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let item = each_array[$$index];
              $$payload4.out += `<tr><td class="text-xs md:text-base text-wrap">${escape_html(item.employeeId)}</td><td class="text-xs md:text-base text-wrap">${escape_html(item.firstName)}</td><td class="text-xs md:text-base text-wrap">${escape_html(item.lastName)}</td><td class="text-xs md:text-base text-wrap">${escape_html(formatTime(item.clockIn))}</td><td class="text-xs md:text-base text-wrap">${escape_html(formatTime(item.clockOut))}</td></tr>`;
            }
            $$payload4.out += `<!--]--></tbody></table></div>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      };
      Tabs($$payload2, {
        fluid: true,
        get value() {
          return group;
        },
        set value($$value) {
          group = $$value;
          $$settled = false;
        },
        list,
        content,
        $$slots: { list: true, content: true }
      });
    }
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Home($$payload) {
  Wrapper($$payload, {
    children: ($$payload2) => {
      Header($$payload2);
      $$payload2.out += `<!----> <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto]"><aside></aside> `;
      Content($$payload2);
      $$payload2.out += `<!----> <aside></aside></div>`;
    },
    $$slots: { default: true }
  });
}
function _page($$payload) {
  $$payload.out += `<main class="flex flex-col items-center">`;
  Home($$payload);
  $$payload.out += `<!----></main>`;
}
export {
  _page as default
};
