export interface RentalRequest {
  id: string;
  equipmentId: string;
  equipmentName: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
} 