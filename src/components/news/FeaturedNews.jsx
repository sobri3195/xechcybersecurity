import NewsCard from './NewsCard'; export default function FeaturedNews({item}){return item?<div><p className="eyebrow mb-4">Artikel Unggulan</p><NewsCard item={item}/></div>:null}
