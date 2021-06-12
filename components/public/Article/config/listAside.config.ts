export default [
  [
    {
      title: '块布局',
      icon: 'layout1',
      event: that => (that.layout.name = ''),
    },
    {
      title: '行布局',
      icon: 'layout2',
      event: that => (that.layout.name = 'line-layout'),
    },
    {
      title: '行布局',
      icon: 'layout3',
      event: that => (that.layout.name = 'line-layout-noimg'),
    },
  ],
  [
    {
      title: '最新',
      icon: 'zuixin',
      event: () => {},
    },
    {
      title: '热度排序',
      icon: 'remen',
      event: () => {},
    },
    {
      title: '评论排序',
      icon: 'pinglun',
      event: () => {},
    },
    {
      title: '浏览量排序',
      icon: 'yueduliang',
      event: () => {},
    },
  ],
  [
    {
      title: '配置',
      icon: 'shezhi',
      event: () => {},
    },
  ],
]
