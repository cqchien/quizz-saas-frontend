// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ApiResponse<T> = {
    data: T;
    statusCode?: string;
    message?: string;
    success?: boolean;
  };

  type LoginResponse = {
    token: Token;
    user: User;
  };

  type Token = {
    expiresIn: number;
    accessToken: string;
  };

  type User = {
    id: string;
    name: string;
    role: string;
    email: string;
    password?: string;
    avatar?: string;
    phone?: string;
    updatedAt?: Date;
    createdAt?: Date;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  // type RuleListItem = {
  //   key?: number;
  //   disabled?: boolean;
  //   href?: string;
  //   avatar?: string;
  //   name?: string;
  //   owner?: string;
  //   desc?: string;
  //   callNo?: number;
  //   status?: number;
  //   updatedAt?: string;
  //   createdAt?: string;
  //   progress?: number;
  // };

  // type RuleList = {
  //   data?: RuleListItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  type LoginParams = {
    email?: string;
    password?: string;
  };

  // type NoticeIconList = {
  //   data?: NoticeIconItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  // type NoticeIconItemType = 'notification' | 'message' | 'event';

  // type NoticeIconItem = {
  //   id?: string;
  //   extra?: string;
  //   key?: string;
  //   read?: boolean;
  //   avatar?: string;
  //   title?: string;
  //   status?: string;
  //   datetime?: string;
  //   description?: string;
  //   type?: NoticeIconItemType;
  // };
}
