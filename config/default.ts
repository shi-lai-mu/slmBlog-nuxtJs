import { DefaultConfig } from '../interface/config';

const defaultConfig: DefaultConfig = {
  name: '史莱姆的博客',
  domain: 'https://slmblog.com',
  logo: '/logo/logo.png',
  icp: '浙ICP备18049156号-2',
  icpLink: 'http://www.miitbeian.gov.cn',
  keepOnRecord: '浙公网安备 33038102331168号',
  keepOnRecordLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33038102331168',
  copyRight: `© CopyRight 2018-${ new Date().getFullYear() } {{ domain }} Rights Reserved.`
};

export default defaultConfig;