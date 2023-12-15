import { IRequestOptions } from "@/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class DataProviderService {
  private static instance: DataProviderService;
  private static readonly BASE_URL = "http://localhost:5999/v1/api";

  private constructor() {}

  static getInstance(): DataProviderService {
    if (!DataProviderService.instance) {
      DataProviderService.instance = new DataProviderService();
    }

    return DataProviderService.instance;
  }

  getRequestUrl(opts: { baseUrl?: string; path?: string }): string {
    const urlPath = opts?.path ?? "";
    return [opts?.baseUrl ?? DataProviderService.BASE_URL, urlPath].join("/");
  }

  async send(opts: IRequestOptions): Promise<AxiosResponse> {
    const {
      baseUrl,
      path,
      method = "get",
      params = {},
      body: data,
      headers,
    } = opts;
    const requestUrl = this.getRequestUrl({ baseUrl, path });
    const props: AxiosRequestConfig = {
      url: requestUrl,
      method,
      params,
      data,
      headers,
    };

    try {
      const response = await axios.request(props);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(opts: IRequestOptions): Promise<AxiosResponse> {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "get" });
  }

  async post(opts: IRequestOptions): Promise<AxiosResponse> {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "post" });
  }

  async put(opts: IRequestOptions): Promise<AxiosResponse> {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "put" });
  }

  async patch(opts: IRequestOptions): Promise<AxiosResponse> {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "patch" });
  }

  async delete(opts: IRequestOptions): Promise<AxiosResponse> {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "delete" });
  }
}
