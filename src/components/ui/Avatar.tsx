import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

const Avatar = ({ src, alt, size = 24 }: AvatarProps) => {
  return (
    <div className="object-cover rounded-full">
      <Image width={size} height={size} src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
