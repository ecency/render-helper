export function cleanReply(s: string): string {
  return (s ? s.split('\n')
    .filter(item => item.includes('Posted using [Partiko') === false)
    .filter(item => item.includes('Posted using [Dapplr') === false)
    .filter(item => item.includes('Posted Using [LeoFinance') === false)
    .filter(item => item.includes('Posted via [neoxian') === false)
    .filter(item => item.includes('Posted with [STEMGeeks') === false)
    .filter(item => item.includes('<center><sub>[Posted Using Aeneas.Blog') === false)
    .filter(item => item.includes('<center><sub>Posted via [weedcash.network') === false)
    .filter(item => item.includes('<center>Posted on [NaturalMedicine.io') === false)
    .join('\n') : '')
    .replace('Posted via <a href="https://d.buzz" data-link="promote-link">D.Buzz</a>', '')
}
