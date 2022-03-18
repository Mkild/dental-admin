export const options = (t: I18nt) => [
  {
    prop: 'id',
    label: 'ID',
    width: 50,
  },
  {
    prop: 'name',
    label: t('table.drug.name'),
  },
  {
    prop: 'price',
    label: t('table.drug.price'),
    width: 120,
  },
  {
    prop: 'quantity',
    label: t('table.drug.quantity'),
    width: 120,
  },
  {
    prop: 'batch',
    label: t('table.drug.batch'),
    width: 120,
  },
  {
    prop: 'pd',
    label: t('table.drug.pd'),
    width: 120,
  },
  {
    prop: 'exp',
    label: t('table.drug.exp'),
    width: 120,
  },
  {
    prop: 'action',
    label: t('table.drug.action'),
    width: 210,
  },
]
