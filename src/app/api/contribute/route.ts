import { NextRequest, NextResponse } from 'next/server'

// TODO: Replace console.log with real database integration
// (e.g., Supabase insert, Airtable API, or a review-queue CMS)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('[Legaseed /contribute] New submission received at', new Date().toISOString())
    console.log(JSON.stringify(body, null, 2))

    // TODO: persist `body` to database here

    return NextResponse.json({
      success: true,
      message: 'Submission received. Thank you for contributing to the archive.',
    })
  } catch (err) {
    console.error('[Legaseed /contribute] Error processing submission:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
