import { GetServerSideProps } from 'next';
import ProductPage from '@/app/products/[id]/page';


const ProductPageWrapper = () => {
  return <ProductPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  return {
    props: {
      productId: id as string,
    },
  };
};
export default ProductPageWrapper;
