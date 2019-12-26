export namespace HtTypes.client {
  export type model = {}

  export type responce = {}
}

export namespace HtTypes.user {
  export type model = {}

  export type responce = {}
}

export namespace HtTypes.common {
  export type pageConfig = {
    page: number;
    size: number;
    totalPage: number;
    search?: string;
  }

  export type option = {
    title: string;
    value: any;
  }
}
