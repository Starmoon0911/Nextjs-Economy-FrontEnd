import { GetServerSideProps } from 'next';
import ProductPage from '@/app/products/[id]/page';

export interface ProductPageProps {
  productId_: string;
}

const ProductPageWrapper = ({ productId_ }: ProductPageProps) => {
  return <ProductPage productId_={productId_} />;
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
