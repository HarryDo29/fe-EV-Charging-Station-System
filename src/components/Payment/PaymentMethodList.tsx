import PaymentMethodCard from './PaymentMethodCard.tsx'

interface PaymentMethodSelectorProps {
  paymentMethod: 'card' | 'momo' | 'zalopay' | 'bank'
  setPaymentMethod: (method: 'card' | 'momo' | 'zalopay' | 'bank') => void
}

export interface PaymentMethodInterface {
  id: 'card' | 'momo' | 'zalopay' | 'bank'
  name: string
  icon: React.ReactNode
}

const paymentMethods: PaymentMethodInterface[] = [
  {
    id: 'card',
    name: 'Thẻ tín dụng/Ghi nợ',
    icon: (
      <div className='w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center mr-3'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
          <path
            fillRule='evenodd'
            d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    )
  },
  {
    id: 'momo',
    name: 'Ví MoMo',
    icon: (
      <div className='w-12 h-8 bg-pink-500 rounded flex items-center justify-center mr-3 font-bold text-white text-sm'>
        M
      </div>
    )
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    icon: (
      <div className='w-12 h-8 bg-blue-400 rounded flex items-center justify-center mr-3 font-bold text-white text-sm'>
        Z
      </div>
    )
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    icon: (
      <div className='w-12 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center mr-3'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    )
  }
]

const PaymentMethodList = ({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-xl font-semibold mb-4'>Phương thức thanh toán</h2>
      <div className='space-y-3'>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        ))}
      </div>
    </div>
  )
}

export default PaymentMethodList
