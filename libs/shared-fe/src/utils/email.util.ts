export function maskEmail(email: string) {
    const [localPart, domain] = email.split('@');
    
    if (localPart.length <= 4) {
        return localPart[0] + "****" + "@" + domain;
    }

    const visiblePart = localPart.substring(0, 6); 
    return visiblePart + "******" + "@" + domain;
}
