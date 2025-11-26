import { NextRequest, NextResponse } from 'next/server';
import { LeadPayload } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    // Validate required fields
    if (!body.source || !body.name || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields: source, name, or email' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the lead (in production, this would be saved to a database)
    console.log('=== NEW LEAD RECEIVED ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Source:', body.source);
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Phone:', body.phone || 'Not provided');
    console.log('Property ID:', body.propertyId || 'N/A');
    console.log('Message:', body.message || 'N/A');
    console.log('Preferred Time:', body.preferredTime || 'N/A');
    console.log('========================\n');

    // TODO: Here we can:
    // - Send this lead to a CRM (e.g. HubSpot, Pipedrive, Salesforce)
    // - Trigger an AI assistant to send a personalised email or WhatsApp reply
    // - Store in a database for analytics and lead scoring
    // - Send notification to realtor via email/SMS
    // - Add to email marketing automation (e.g. Mailchimp, SendGrid)
    // - Track conversion events for marketing analytics

    // Example CRM integration (commented out):
    // await fetch('https://api.hubspot.com/crm/v3/objects/contacts', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     properties: {
    //       email: body.email,
    //       firstname: body.name.split(' ')[0],
    //       lastname: body.name.split(' ').slice(1).join(' '),
    //       phone: body.phone,
    //       lead_source: body.source,
    //       property_interest: body.propertyId,
    //     },
    //   }),
    // });

    // Example AI-powered auto-response (commented out):
    // await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'You are a helpful real estate assistant...',
    //       },
    //       {
    //         role: 'user',
    //         content: `Generate a personalized email response for ${body.name} who inquired about ${body.source}`,
    //       },
    //     ],
    //   }),
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Lead received successfully',
        leadId: `LEAD-${Date.now()}`, // In production, this would be a database ID
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

