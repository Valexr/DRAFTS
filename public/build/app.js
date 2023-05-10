// env/lr.js
var sse = new EventSource("/esbuild");
sse.addEventListener("change", () => location.reload());

// package.json
var name = "drafts";
var repository = {
  type: "git",
  url: "https://github.com/Valexr/DRAFTS.git"
};

// node_modules/.pnpm/svelte@3.59.1/node_modules/svelte/internal/index.mjs
function noop() {
}
function add_location(element2, file3, line, column, char) {
  element2.__svelte_meta = {
    loc: { file: file3, line, column, char }
  };
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function not_equal(a, b) {
  return a != a ? b == b : a !== b;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var ResizeObserverSingleton = class {
  constructor(options) {
    this.options = options;
    this._listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
  }
  observe(element2, listener) {
    this._listeners.set(element2, listener);
    this._getObserver().observe(element2, this.options);
    return () => {
      this._listeners.delete(element2);
      this._observer.unobserve(element2);
    };
  }
  _getObserver() {
    var _a;
    return (_a = this._observer) !== null && _a !== void 0 ? _a : this._observer = new ResizeObserver((entries) => {
      var _a2;
      for (const entry of entries) {
        ResizeObserverSingleton.entries.set(entry.target, entry);
        (_a2 = this._listeners.get(entry.target)) === null || _a2 === void 0 ? void 0 : _a2(entry);
      }
    });
  }
};
ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function element(name2) {
  return document.createElement(name2);
}
function svg_element(name2) {
  return document.createElementNS("http://www.w3.org/2000/svg", name2);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = /* @__PURE__ */ Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var seen_callbacks = /* @__PURE__ */ new Set();
var flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
var outroing = /* @__PURE__ */ new Set();
var outros;
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
var _boolean_attributes = [
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
];
var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance3, create_fragment3, not_equal2, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal: not_equal2,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance3 ? instance3(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment3 ? create_fragment3($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr2, _oldValue, newValue) {
      this[attr2] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};
function dispatch_dev(type, detail) {
  document.dispatchEvent(custom_event(type, Object.assign({ version: "3.59.1" }, detail), { bubbles: true }));
}
function append_dev(target, node) {
  dispatch_dev("SvelteDOMInsert", { target, node });
  append(target, node);
}
function insert_dev(target, node, anchor) {
  dispatch_dev("SvelteDOMInsert", { target, node, anchor });
  insert(target, node, anchor);
}
function detach_dev(node) {
  dispatch_dev("SvelteDOMRemove", { node });
  detach(node);
}
function attr_dev(node, attribute, value) {
  attr(node, attribute, value);
  if (value == null)
    dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
  else
    dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
}
function set_data_dev(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  dispatch_dev("SvelteDOMSetData", { node: text2, data });
  text2.data = data;
}
function validate_slots(name2, slot, keys) {
  for (const slot_key of Object.keys(slot)) {
    if (!~keys.indexOf(slot_key)) {
      console.warn(`<${name2}> received an unexpected slot "${slot_key}".`);
    }
  }
}
var SvelteComponentDev = class extends SvelteComponent {
  constructor(options) {
    if (!options || !options.target && !options.$$inline) {
      throw new Error("'target' is a required option");
    }
    super();
  }
  $destroy() {
    super.$destroy();
    this.$destroy = () => {
      console.warn("Component was already destroyed");
    };
  }
  $capture_state() {
  }
  $inject_state() {
  }
};

// src/lib/Gh.svelte
var file = "src/lib/Gh.svelte";
function create_fragment(ctx) {
  let a;
  let svg;
  let path;
  let a_href_value;
  const block = {
    c: function create() {
      a = element("a");
      svg = svg_element("svg");
      path = svg_element("path");
      attr_dev(path, "d", "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12");
      attr_dev(path, "fill", "currentColor");
      add_location(path, file, 7, 9, 253);
      attr_dev(svg, "width", "24");
      attr_dev(svg, "height", "24");
      attr_dev(svg, "fill", "none");
      attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
      add_location(svg, file, 6, 4, 169);
      attr_dev(a, "href", a_href_value = /*repository*/
      ctx[0].url);
      attr_dev(a, "target", "_blank");
      attr_dev(a, "rel", "noreferrer");
      attr_dev(a, "id", "gh");
      add_location(a, file, 5, 0, 98);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, svg);
      append_dev(svg, path);
    },
    p: function update2(ctx2, [dirty]) {
      if (dirty & /*repository*/
      1 && a_href_value !== (a_href_value = /*repository*/
      ctx2[0].url)) {
        attr_dev(a, "href", a_href_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("Gh", slots, []);
  let { repository: repository2 } = $$props;
  $$self.$$.on_mount.push(function() {
    if (repository2 === void 0 && !("repository" in $$props || $$self.$$.bound[$$self.$$.props["repository"]])) {
      console.warn("<Gh> was created without expected prop 'repository'");
    }
  });
  const writable_props = ["repository"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<Gh> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("repository" in $$props2)
      $$invalidate(0, repository2 = $$props2.repository);
  };
  $$self.$capture_state = () => ({ repository: repository2 });
  $$self.$inject_state = ($$props2) => {
    if ("repository" in $$props2)
      $$invalidate(0, repository2 = $$props2.repository);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [repository2];
}
var Gh = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance, create_fragment, not_equal, { repository: 0 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Gh",
      options,
      id: create_fragment.name
    });
  }
  get repository() {
    throw new Error("<Gh>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set repository(value) {
    throw new Error("<Gh>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var Gh_default = Gh;

// src/App.svelte
var file2 = "src/App.svelte";
function create_fragment2(ctx) {
  let title_value;
  let t0;
  let header;
  let button0;
  let t2;
  let h1;
  let gh;
  let t3;
  let t4;
  let t5;
  let button1;
  let t7;
  let main;
  let p0;
  let t9;
  let footer;
  let p1;
  let current;
  document.title = title_value = /*name*/
  ctx[0];
  gh = new Gh_default({
    props: { repository: (
      /*repository*/
      ctx[1]
    ) },
    $$inline: true
  });
  const block = {
    c: function create() {
      t0 = space();
      header = element("header");
      button0 = element("button");
      button0.textContent = "Some";
      t2 = space();
      h1 = element("h1");
      create_component(gh.$$.fragment);
      t3 = space();
      t4 = text(
        /*name*/
        ctx[0]
      );
      t5 = space();
      button1 = element("button");
      button1.textContent = "Else";
      t7 = space();
      main = element("main");
      p0 = element("p");
      p0.textContent = "Main";
      t9 = space();
      footer = element("footer");
      p1 = element("p");
      p1.textContent = "Footer";
      add_location(button0, file2, 12, 4, 217);
      add_location(h1, file2, 13, 4, 243);
      add_location(button1, file2, 17, 4, 318);
      add_location(header, file2, 11, 0, 204);
      add_location(p0, file2, 21, 4, 362);
      add_location(main, file2, 20, 0, 351);
      add_location(p1, file2, 25, 4, 396);
      add_location(footer, file2, 24, 0, 383);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, header, anchor);
      append_dev(header, button0);
      append_dev(header, t2);
      append_dev(header, h1);
      mount_component(gh, h1, null);
      append_dev(h1, t3);
      append_dev(h1, t4);
      append_dev(header, t5);
      append_dev(header, button1);
      insert_dev(target, t7, anchor);
      insert_dev(target, main, anchor);
      append_dev(main, p0);
      insert_dev(target, t9, anchor);
      insert_dev(target, footer, anchor);
      append_dev(footer, p1);
      current = true;
    },
    p: function update2(ctx2, [dirty]) {
      if ((!current || dirty & /*name*/
      1) && title_value !== (title_value = /*name*/
      ctx2[0])) {
        document.title = title_value;
      }
      const gh_changes = {};
      if (dirty & /*repository*/
      2)
        gh_changes.repository = /*repository*/
        ctx2[1];
      gh.$set(gh_changes);
      if (!current || dirty & /*name*/
      1)
        set_data_dev(
          t4,
          /*name*/
          ctx2[0]
        );
    },
    i: function intro(local) {
      if (current)
        return;
      transition_in(gh.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(gh.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(t0);
      if (detaching)
        detach_dev(header);
      destroy_component(gh);
      if (detaching)
        detach_dev(t7);
      if (detaching)
        detach_dev(main);
      if (detaching)
        detach_dev(t9);
      if (detaching)
        detach_dev(footer);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment2.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  validate_slots("App", slots, []);
  let { name: name2 } = $$props;
  let { repository: repository2 } = $$props;
  $$self.$$.on_mount.push(function() {
    if (name2 === void 0 && !("name" in $$props || $$self.$$.bound[$$self.$$.props["name"]])) {
      console.warn("<App> was created without expected prop 'name'");
    }
    if (repository2 === void 0 && !("repository" in $$props || $$self.$$.bound[$$self.$$.props["repository"]])) {
      console.warn("<App> was created without expected prop 'repository'");
    }
  });
  const writable_props = ["name", "repository"];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$" && key !== "slot")
      console.warn(`<App> was created with unknown prop '${key}'`);
  });
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(0, name2 = $$props2.name);
    if ("repository" in $$props2)
      $$invalidate(1, repository2 = $$props2.repository);
  };
  $$self.$capture_state = () => ({ Gh: Gh_default, name: name2, repository: repository2 });
  $$self.$inject_state = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(0, name2 = $$props2.name);
    if ("repository" in $$props2)
      $$invalidate(1, repository2 = $$props2.repository);
  };
  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }
  return [name2, repository2];
}
var App = class extends SvelteComponentDev {
  constructor(options) {
    super(options);
    init(this, options, instance2, create_fragment2, not_equal, { name: 0, repository: 1 });
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "App",
      options,
      id: create_fragment2.name
    });
  }
  get name() {
    throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set name(value) {
    throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  get repository() {
    throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
  set repository(value) {
    throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
  }
};
var App_default = App;

// src/app.ts
var app = new App_default({
  target: document.body,
  props: { name, repository }
});
var app_default = app;
export {
  app_default as default
};
//# sourceMappingURL=app.js.map
