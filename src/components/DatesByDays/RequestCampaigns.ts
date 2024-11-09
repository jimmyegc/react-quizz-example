/* eslint-disable @typescript-eslint/no-explicit-any */

interface TelephonyCampaignModel {
  telephonySupplierId: number //proveedor
  positions: number[]
  agencies: number[]
  showPhone: boolean
  [key: string]: any;
}
export interface RequestAddCampaign {
  campaign: string;
  description: string;
  campaignShortName: string;
  creditIssuerId: number;
  flowProcessId: number;
  operationDays: OperationDay[],
  products: number[]
  telephonyCampaign: TelephonyCampaignModel
}

export interface RequestUpdateCampaign {
  id: number;
  campaign: string;
  description: string;
  campaignShortName: string;
  creditIssuerId: number;
  flowProcessId: number;
  operationDays: OperationDay[],
  products: number[]
}

export interface RequestUpdateStateCampaign {
  id: number;
  active: boolean;
} 

export interface OperationDay { 
  day: number;
  initialHour: string;
  finalHour: string;
}