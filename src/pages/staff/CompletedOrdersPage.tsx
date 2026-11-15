import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { OrderTable } from '../../components/orders/OrderTable';

export const CompletedOrdersPage: React.FC = () => {
  const { orders } = useOrders();

  const collectedOrders = orders.filter(o => o.currentStatus === 'Collected');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Collected Orders Archive ({collectedOrders.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Historical log of all laundry orders handed over to hostellers.
        </p>
      </div>

      {/* Orders Table Filtered to Collected */}
      <OrderTable
        orders={collectedOrders}
        title="Completed Handover Archive"
        subtitle="Audit trail of collected laundry bags"
        showStaffControls={true}
      />
    </div>
  );
};
