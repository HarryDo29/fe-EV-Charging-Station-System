import type { PaymentMethodInterface } from './PaymentMethodList'

interface PaymentMethodProps {
  method: PaymentMethodInterface
  paymentMethod: 'card' | 'momo' | 'zalopay' | 'bank'
  setPaymentMethod: (method: 'card' | 'momo' | 'zalopay' | 'bank') => void
}

const PaymentMethodCard = ({ method, paymentMethod, setPaymentMethod }: PaymentMethodProps) => {
  return (
    <div
      onClick={() => setPaymentMethod(method.id)}
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center ${
        paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className='flex-1 flex items-center'>
        {method.icon}
        <span className='font-medium'>{method.name}</span>
      </div>
      {paymentMethod === method.id && (
        <svg className='w-6 h-6 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
      )}
    </div>
  )
}

export default PaymentMethodCard
