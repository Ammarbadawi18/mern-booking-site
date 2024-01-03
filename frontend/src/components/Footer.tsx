const Footer = () => {
    return (
        <div className="bg-red-800 py-10">
            <div className="container mx-auto flex justify-between item-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    Holidays ticket
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="courser-pointer">
                        Privacy Policy
                    </p>
                    <p className="courser-pointer">
                        Terms and Services
                    </p>
                </span>
            </div>
        </div>
    );
};

export default Footer;