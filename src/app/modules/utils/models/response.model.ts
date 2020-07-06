export class ResponseModel{
    public success?:boolean;
    public data?: any;
    public notifications?: NotificationsModel[];
}

export class NotificationsModel{
    public key?:string;
    public value?: string;
    public data?: any;
}