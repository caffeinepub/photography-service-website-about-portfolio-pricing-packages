/**
 * Utility to generate canonical canister-based URLs that resolve on ICP boundary nodes.
 * 
 * The canonical URLs use the actual frontend canister ID in the format:
 * https://<canister-id>.icp0.io/ (or .ic0.app)
 * 
 * This ensures URLs work reliably after deployment, avoiding "Canister ID Not Resolved" errors
 * that occur when using vanity domains or non-canonical hostnames.
 */

interface CanonicalUrls {
  client: string;
  office: string;
  isLocal: boolean;
  currentOrigin: string;
}

/**
 * Extract canister ID from hostname if it's in the format <canister-id>.icp0.io or <canister-id>.ic0.app
 */
function extractCanisterIdFromHostname(hostname: string): string | null {
  // Match patterns like: abc123-xyz.icp0.io or abc123-xyz.ic0.app
  const match = hostname.match(/^([a-z0-9-]+)\.(icp0\.io|ic0\.app)$/i);
  return match ? match[1] : null;
}

/**
 * Check if we're running in local development
 */
function isLocalDevelopment(): boolean {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
}

/**
 * Get the frontend canister ID from environment or current hostname
 */
function getFrontendCanisterId(): string | null {
  // Try to extract from current hostname first (works when deployed)
  const canisterId = extractCanisterIdFromHostname(window.location.hostname);
  if (canisterId) {
    return canisterId;
  }

  // Fallback to environment variable if set (useful for localhost)
  const envCanisterId = import.meta.env.VITE_FRONTEND_CANISTER_ID;
  if (envCanisterId && typeof envCanisterId === 'string') {
    return envCanisterId;
  }

  return null;
}

/**
 * Generate canonical URLs for the application.
 * Returns both client and office URLs, plus metadata about the environment.
 */
export function getCanonicalUrls(): CanonicalUrls {
  const isLocal = isLocalDevelopment();
  const currentOrigin = window.location.origin;
  const currentPath = window.location.pathname;

  // For local development, show localhost URLs
  if (isLocal) {
    return {
      client: currentOrigin + currentPath,
      office: currentOrigin + currentPath + '#/office',
      isLocal: true,
      currentOrigin,
    };
  }

  // For deployed environments, generate canonical canister-based URLs
  const canisterId = getFrontendCanisterId();
  
  if (!canisterId) {
    // Fallback to current origin if we can't determine canister ID
    // (This shouldn't happen in production, but provides a safe fallback)
    return {
      client: currentOrigin + currentPath,
      office: currentOrigin + currentPath + '#/office',
      isLocal: false,
      currentOrigin,
    };
  }

  // Generate canonical URLs using icp0.io domain
  const canonicalBase = `https://${canisterId}.icp0.io`;
  
  return {
    client: canonicalBase + '/',
    office: canonicalBase + '/#/office',
    isLocal: false,
    currentOrigin,
  };
}

/**
 * Check if the current hostname is a canonical canister domain
 */
export function isCanonicalDomain(): boolean {
  const hostname = window.location.hostname;
  return extractCanisterIdFromHostname(hostname) !== null;
}
