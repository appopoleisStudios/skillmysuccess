import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',
  '/dashboard(.*)',
  '/forum(.*)',
]);

export default clerkMiddleware((auth, req) => {
  console.log(`Path: ${req.nextUrl.pathname}`);  // Logging path
  if (isProtectedRoute(req)) {
    console.log(`Protected route: ${req.nextUrl.pathname}`);  // Logging protected route
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
