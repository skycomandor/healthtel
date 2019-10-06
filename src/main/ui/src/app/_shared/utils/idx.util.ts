export function idx(o, p) { return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o); }
