export const options = (t: I18nt) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'title',
    label: t('table.notice.title'),
  },
  {
    prop: 'author',
    label: t('table.notice.author'),
    width: 120,
  },
  {
    prop: 'date',
    label: t('table.notice.date'),
    width: 120,
  },
  {
    prop: 'action',
    label: t('table.notice.action'),
    width: 210,
  },
]
