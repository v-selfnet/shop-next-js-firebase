
import SingleCategory from './SingleCategory';
import getCaregories from '@/utils/getCaregories';

const Categories = async () => {
    const categories = await getCaregories();
    return (
        <div>
            <p className='my-10 text-2xl font-semibold'>Total Categories: {categories.length}</p>
            <div className='grid lg:grid-cols-3 gap-4 justify-center'>
            {
                categories.map(category => <SingleCategory
                    key={category._id}
                    category={category}>
                </SingleCategory>)
            }
            </div>
        </div>
    );
};

export default Categories;