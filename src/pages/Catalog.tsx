import ProductSection from "@/components/ProductSection";

const Catalog = () => {
  return (
    <>
      <ProductSection
        imageUrl="https://dummyimage.com/400x400"
        brand="BRAND NAME"
        title="The Catcher in the Rye"
        description="Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY."
        price="$58.00"
        reviewsCount={4}
      />
    </>
  );
};

export default Catalog;
