import { getCategoriesFromDb } from '@/services/caregory.service';
import { cache } from 'react';
import 'server-only';

const getCaregories = cache(() => {
    return getCategoriesFromDb();
});

export default getCaregories;