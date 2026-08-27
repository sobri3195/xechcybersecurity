export const formatArticleDate = value => new Intl.DateTimeFormat('id-ID', { day:'numeric', month:'long', year:'numeric', timeZone:'UTC' }).format(new Date(`${value}T00:00:00Z`))
