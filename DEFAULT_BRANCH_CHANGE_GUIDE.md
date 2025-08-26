# Default Branch Change Guide: mainx → main

## Overview
This guide explains how to change the default branch from `mainx` to `main` in the GitHub repository.

## Technical Changes Completed ✅

### 1. Branch Synchronization
- **Issue**: The `main` branch had slightly different code than `mainx`
- **Solution**: Updated `main` branch to match `mainx` exactly
- **Change**: Fixed cannon drawing logic in `script.js` to use the correct width parameter

### 2. Application Testing
- **Verified**: Projectile motion simulation works correctly
- **Confirmed**: Application displays properly with:
  - Light blue sky background
  - Green ground surface
  - Black cannon positioned on the right
  - Projectile following realistic parabolic trajectory
  - Dotted path visualization

![Application Screenshot](https://github.com/user-attachments/assets/51baf16f-75b6-4f44-95e9-b003fb4c5749)

## GitHub Repository Settings Change Required 🔄

**Important**: The actual default branch change requires GitHub repository admin access and cannot be done through git commands alone.

### Steps to Change Default Branch in GitHub:

1. **Navigate to Repository Settings**
   - Go to: `https://github.com/nagdeepanjan/projectile/settings`
   - Click on "Branches" in the left sidebar

2. **Change Default Branch**
   - Find the "Default branch" section
   - Click the pencil/edit icon next to the current default branch (`mainx`)
   - Select `main` from the dropdown
   - Click "Update"

3. **Confirm the Change**
   - GitHub will show a confirmation dialog
   - Review the warning about the impact
   - Click "I understand, update the default branch"

### After Changing Default Branch:

1. **Optional: Delete mainx branch**
   - Once `main` is the default, consider deleting the `mainx` branch if no longer needed
   - This can be done from the repository's "Branches" page

2. **Update Local Repositories**
   - All collaborators should update their local repositories:
   ```bash
   git checkout main
   git pull origin main
   git remote set-head origin main
   ```

## Summary of Changes Made

- ✅ Synchronized `main` branch with latest `mainx` content
- ✅ Verified application functionality
- ✅ Prepared `main` branch to be the new default
- 📋 Documented process for GitHub settings change

The repository is now ready for the default branch change in GitHub settings.