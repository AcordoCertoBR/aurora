import * as React from 'react';
import * as S from "@ds-stories/lib/components/Drawer/Drawer.stories";

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  const composed = decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
  // storybook's backgrounds addon, minimally: `default` names an entry in the
  // merged `values` list (story list first, then meta), falling back to the
  // addon's two built-in presets. Stories that carry a background rely on it
  // for contrast — a white-on-white cell is the failure this reproduces away.
  const BUILTIN_BG: any = { light: '#F8F8F8', dark: '#333333' };
  const bgMeta: any = (meta.parameters ?? {}).backgrounds ?? {};
  const bgStory: any = ((st && st.parameters) ?? {}).backgrounds ?? {};
  const bgValues: any[] = ([] as any[]).concat(bgStory.values ?? []).concat(bgMeta.values ?? []);
  const bgName: any = bgStory.default ?? bgMeta.default;
  const bgHit: any = bgName ? bgValues.find((v: any) => v && v.name === bgName) : null;
  const bg: string | null = (bgHit && bgHit.value) || (bgName && BUILTIN_BG[bgName]) || null;
  if (!bg) return composed;
  return () => React.createElement(
    'div',
    { style: { background: bg, padding: 12, width: '100%', boxSizing: 'border-box' } },
    React.createElement(composed),
  );
}

export const WithText = /* With Text */ compose(S, "WithText");
export const WithLogo = /* With Logo */ compose(S, "WithLogo");
export const WithProfile = /* With Profile */ compose(S, "WithProfile");
// The BottomSheet story anchors itself with `position: fixed; bottom: 0`.
// cfg.overrides.Drawer.cardMode "single" wraps the card in a containing block
// (that containment is what keeps portal content inside its cell instead of
// painting over siblings), so `bottom: 0` resolves against the WRAPPER, not the
// viewport — and a content-height wrapper puts the sheet at the top. Giving the
// cell a real height makes the wrapper tall, so the sheet lands at the bottom
// the way the storybook reference shows it. Setting cfg.overrides.Drawer.viewport
// alone does NOT fix this: it sizes the capture, not the containing block.
const BottomSheetStory = compose(S, "BottomSheet");
export const BottomSheet = () => (
  <div style={{ position: "relative", height: 540 }}>
    {React.createElement(BottomSheetStory)}
  </div>
);
