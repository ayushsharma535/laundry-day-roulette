import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { OrderTable } from '../../components/orders/OrderTable';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import type { Order } from '../../types/order';

export const ReadyOrdersPage: React.FC = () => {
  const { orders, updateStatus } = useOrders();
  const [confirmCollectOrder, setConfirmCollectOrder] = useState<Order | null>(null);

  const readyOrders = orders.filter(o => o.currentStatus === 'Ready');

  const handleConfirmCollection = () => {
    if (confirmCollectOrder) {
      updateStatus(
        confirmCollectOrder.id,
        'Collected',
        `Collected at counter. Verified student ID ${confirmCollectOrder.regNo}.`
      );
      setConfirmCollectOrder(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Ready for Collection ({readyOrders.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Garments that have been washed, dried, ironed, and packaged. Ready for student handover.
        </p>
      </div>

      {/* Counter Desk Notice */}
      <div className="bg-teal-50/60 border border-teal-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-teal-900 block">Pickup Counter Shelf</span>
          <p className="text-slate-600">
            {readyOrders.length} orders waiting on shelf. Verify Token ID or Student ID Card upon handover.
          </p>
        </div>
        <span className="text-teal-800 font-semibold bg-white px-2.5 py-1 rounded-lg border border-teal-100 w-fit">
          Collection Hours: 04:00 PM – 07:30 PM
        </span>
      </div>

      {/* Orders Table Filtered to Ready Only */}
      <OrderTable
        orders={readyOrders}
        title="Ready for Pickup Queue"
        subtitle="Click 'Handover' to complete the student handover"
        showStaffControls={true}
      />

      {/* Confirmation Dialog */}
      {confirmCollectOrder && (
        <ConfirmDialog
          isOpen={Boolean(confirmCollectOrder)}
          onClose={() => setConfirmCollectOrder(null)}
          onConfirm={handleConfirmCollection}
          title="Confirm Handover"
          message={`Confirm collection of order ${confirmCollectOrder.id} for ${confirmCollectOrder.studentName}?`}
          confirmLabel="Mark as Collected"
          variant="success"
        />
      )}
    </div>
  );
};
