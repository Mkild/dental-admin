export const options = (t: I18nt) => [
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: t('table.record.name'),
  },
  {
    prop: 'illness',
    label: t('table.record.illness'),
  },
  {
    prop: 'dp',
    label: t('table.record.dp'),
    width: 140,
  },
  {
    prop: 'doctor',
    label: t('table.record.doctor'),
    width: 120,
  },
  {
    prop: 'date',
    label: t('table.record.date'),
    width: 120,
  },
  {
    prop: 'action',
    label: t('table.record.action'),
    width: 210,
  },
]
