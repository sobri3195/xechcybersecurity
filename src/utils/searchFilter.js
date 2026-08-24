export const normalize=value=>String(value??'').trim().replace(/\s+/g,' ').toLocaleLowerCase('id');
export const matchesSearch=(item,query,fields)=>{const q=normalize(query);return !q||fields.some(field=>normalize(item[field]).includes(q))};
