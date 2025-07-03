import { NextResponse } from 'next/server';
import { sendToTelegram } from '@/lib/telegramBot';
import type { Order } from '@/types';

// Simple in-memory storage (replace with DB in production)
const orderCounts: Record<string, number> = {};

export async function POST(req: Request) {
  const order: Order = await req.json();
  
  // Create unique guest identifier
  const guestId = `${order.wing}-${order.table}-${order.name}`;
  
  // Check order count
  const count = orderCounts[guestId] || 0;
  if (count >= 2) {
    return NextResponse.json(
      { error: 'You have reached your maximum order limit (2 orders per guest)' },
      { status: 400 }
    );
  }
  
  // Update order count
  orderCounts[guestId] = count + 1;
  
  // Send to Telegram
  const message = `
    🎉 *New Wedding Order* 🎉
    **Wing**: ${order.wing === 'groom' ? "Groom's" : "Bride's"}
    **Table**: ${order.table}
    **Guest**: ${order.name}
    **Main**: ${order.main}
    **Protein**: ${order.protein}
    **Beverage**: ${order.beverage}
    **Appetizer**: ${order.appetizer}
    `;
  
  await sendToTelegram(message);
  
  return NextResponse.json({ 
    success: true,
    message: 'Order placed successfully!',
    ordersLeft: 2 - orderCounts[guestId]
  });
}