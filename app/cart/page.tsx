'use client';

import { useCart } from '@shopify/hydrogen-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const cart = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!cart) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Loading cart...</p>
      </div>
    );
  }

  const handleRemoveItem = (lineId: string) => {
    cart.linesRemove([lineId]);
  };

  const handleUpdateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(lineId);
    } else {
      cart.linesUpdate([{ id: lineId, quantity }]);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    if (cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
    setIsProcessing(false);
  };

  const lines = cart.lines || [];
  const subtotal = Number(cart.cost?.subtotalAmount?.amount) || 0;
  const tax = Number(cart.cost?.totalTaxAmount?.amount) || 0;
  const total = Number(cart.cost?.totalAmount?.amount) || 0;
  const currency = cart.cost?.totalAmount?.currencyCode || 'USD';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {lines.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow mb-6">
              {lines.map((line) => {
                if (!line) {
                  return null;
                }
                const quantity = line.quantity || 0;
                const price = Number(line.cost?.totalAmount?.amount) || 0;
                const unitPrice = Number(line.cost?.amountPerQuantity?.amount) || 0;

                return (
                  <div
                    key={line.id}
                    className="flex gap-4 p-6 border-b last:border-b-0"
                  >
                    {line.merchandise?.image && (
                      <img
                        src={line.merchandise.image.url}
                        alt={line.merchandise.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}

                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">
                        {line.merchandise?.title}
                      </h2>
                      {line.merchandise?.selectedOptions && (
                        <div className="text-sm text-gray-600 mt-1">
                          {line.merchandise.selectedOptions.map((opt) => (
                            opt && (
                              <div key={opt.name}>
                                {opt.name}: {opt.value}
                              </div>
                            )
                          ))}
                        </div>
                      )}
                      <div className="text-gray-900 font-semibold mt-2">
                        ${unitPrice.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(line.id ?? '', quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              line.id ?? '',
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-12 text-center border-l border-r py-1"
                        />
                        <button
                          onClick={() =>
                            handleUpdateQuantity(line.id ?? '', quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="w-20 text-right">
                        <div className="font-semibold">
                          ${price.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(line.id ?? '')}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total:</span>
                <span>
                  ${total.toFixed(2)} {currency}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/"
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded text-center hover:bg-gray-300 font-medium"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium disabled:bg-blue-400"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}



