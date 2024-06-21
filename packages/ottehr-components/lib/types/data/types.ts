export interface ApiError {
  message: string;
}

export type GetZapEHRAPIParams = {
  isAppLocal?: 'true' | 'false';
  checkInZambdaID?: string;
  createAppointmentZambdaID?: string;
  cancelAppointmentZambdaID?: string;
  updateAppointmentZambdaID?: string;
  getPatientsZambdaID?: string;
  getScheduleZambdaID?: string;
  getAppointmentsZambdaID?: string;
  getPaperworkZambdaID?: string;
  createPaperworkZambdaID?: string;
  updatePaperworkZambdaID?: string;
  getWaitStatusZambdaID?: string;
  joinCallZambdaID?: string;
  videoChatCreateInviteZambdaID?: string;
  videoChatCancelInviteZambdaID?: string;
  videoChatListInvitesZambdaID?: string;
  getPresignedFileURLZambdaID?: string;
};
