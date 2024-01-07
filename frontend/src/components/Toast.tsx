import { useEffect } from "react"

type ToastProps = {
    message: string,
    type: "SUCCESS" | "ERROR"
    onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000)
        return (() => {
            clearTimeout(timer)
        })
    }, [onClose])

    const style = type === "SUCCESS"
        ? "fixed top-4 right-4 z-30 p-4 rounded-md bg-black text-white max-w-sm"
        : "fixed top-4 right-4 z-30 p-4 rounded-md bg-black text-white max-w-sm"
    return (
        <div className={style}>
            <div className="flex justify-center items-center">
                <span className="text-1xl font-semibold">
                    {message}
                </span>
            </div>
        </div>
    )
}
export default Toast;