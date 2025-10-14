import type { Transaction } from '../../types/station'

const TransactionCard = ({ trans }: { trans: Transaction }) => {
  return (
    <div
      key={trans.id}
      className='bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-sm'
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-start gap-4'>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
              trans.status === 'success' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
            }`}
          >
            {trans.status === 'success' ? '✓' : '✗'}
          </div>

          <div className='flex-1'>
            <h3 className='font-semibold text-gray-900 mb-1'>{trans.type}</h3>
            <p className='text-sm text-gray-500 mb-2'>{trans.date}</p>
            <div className='flex items-center gap-2'>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  trans.status === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {trans.status === 'success' ? 'Thành công' : 'Thất bại'}
              </span>
              <span className='px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium'>{trans.method}</span>
            </div>
          </div>
        </div>

        <div className='text-right'>
          <p className={`text-2xl font-bold mb-1 ${trans.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trans.amount}
          </p>
          <p className='text-xs text-gray-500'>Số dư: {trans.amount}</p>
        </div>
      </div>

      {/* Details */}
      <div className='pt-4 border-t border-gray-100'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
          <div>
            <p className='text-gray-500 mb-1'>Mã giao dịch</p>
            <p className='font-medium text-gray-800 font-mono text-xs'>{trans.transactionId}</p>
          </div>
          <div>
            <p className='text-gray-500 mb-1'>Mô tả</p>
            <p className='text-gray-800'>{trans.description}</p>
          </div>
        </div>
      </div>

      {/* Action */}
      {trans.status === 'success' && (
        <div className='mt-4 pt-4 border-t border-gray-100'>
          <button className='text-sm text-blue-600 hover:text-blue-700 font-medium'>Xem chi tiết →</button>
        </div>
      )}
    </div>
  )
}

export default TransactionCard
