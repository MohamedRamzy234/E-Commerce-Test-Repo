//method, response
//localhost300/api/brands

import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
//logic

return NextResponse.json ({
    message: "success",

});
}