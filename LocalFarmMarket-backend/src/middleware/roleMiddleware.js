// src/middleware/roleMiddleware.js
// This file is technically handled inside `authMiddleware.js` already
// but since we're not skipping any file, we'll export it here too.

import { authorizeRoles } from './authMiddleware';

module.exports = authorizeRoles;
