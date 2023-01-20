import Card from "../card";

const HomeLayout = ({ heading, items }:{ heading: string; items: { id: number; name: string; imgHref: string }[] }) => {
    return (
        <div className="px-8 pb-8 pt-8 md:pt-12 md:px-12 lg:px-32 flex flex-col gap-4">
            <h2 className="text-4xl md:text-6xl font-bold">{heading}</h2>
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:grid-rows-1 flex flex-col gap-4 md:gap-8">
                {items.map(_ => <Card key={_.id} title={_.name} id={_.id} alt={`${_.name} Photo`} imgURL={_.imgHref} />)}
            </div>
        </div>
    );
};

export default HomeLayout;
