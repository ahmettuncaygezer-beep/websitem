'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check } from 'lucide-react';

const addressSchema = z.object({
    firstName: z.string().min(2, 'En az 2 karakter olmalıdır'),
    lastName: z.string().min(2, 'En az 2 karakter olmalıdır'),
    phone: z.string().regex(/^0[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz (05xx...)'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    address: z.string().min(10, 'Adres detayı çok kısa'),
    city: z.string().min(2, 'Lütfen bir il seçin'),
    district: z.string().min(2, 'Lütfen bir ilçe seçin'),
    postalCode: z.string().length(5, 'Posta kodu 5 haneli olmalıdır'),
    saveAddress: z.boolean().optional(),
});

type FormValues = z.infer<typeof addressSchema>;

export function AddressForm({ onSubmit }: { onSubmit: (data: FormValues) => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            saveAddress: true,
            city: 'İstanbul',
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Ad*</label>
                    <div className="relative">
                        <input
                            {...register('firstName')}
                            className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                            placeholder="Ali"
                        />
                        {touchedFields.firstName && !errors.firstName && (
                            <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4CAF50]" />
                        )}
                    </div>
                    {errors.firstName && <p className="text-[11px] text-[#E53935]">{errors.firstName.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Soyad*</label>
                    <input
                        {...register('lastName')}
                        className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                        placeholder="Kaya"
                    />
                    {errors.lastName && <p className="text-[11px] text-red-500">{errors.lastName.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Telefon*</label>
                    <input
                        {...register('phone')}
                        className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                        placeholder="0532XXXXXXX"
                    />
                    {errors.phone && <p className="text-[11px] text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">E-posta*</label>
                    <input
                        {...register('email')}
                        className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.email ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                        placeholder="ali@email.com"
                    />
                    {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Adres*</label>
                <textarea
                    {...register('address')}
                    rows={3}
                    className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.address ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                    placeholder="Mahalle, Sokak, No, Daire..."
                />
                {errors.address && <p className="text-[11px] text-red-500">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">İl*</label>
                    <select
                        {...register('city')}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-[4px] text-[14px] text-foreground focus:border-selis-gold outline-none transition-all appearance-none"
                    >
                        <option value="İstanbul">İstanbul</option>
                        <option value="Ankara">Ankara</option>
                        <option value="İzmir">İzmir</option>
                        <option value="Bursa">Bursa</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">İlçe*</label>
                    <input
                        {...register('district')}
                        className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.district ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                        placeholder="Kadıköy"
                    />
                    {errors.district && <p className="text-[11px] text-red-500">{errors.district.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Posta Kodu*</label>
                    <input
                        {...register('postalCode')}
                        className={`w-full px-4 py-3 bg-muted border rounded-[4px] text-[14px] text-foreground outline-none transition-all ${errors.postalCode ? 'border-red-500' : 'border-border focus:border-selis-gold'}`}
                        placeholder="34710"
                    />
                    {errors.postalCode && <p className="text-[11px] text-red-500">{errors.postalCode.message}</p>}
                </div>
            </div>

            <div className="flex items-center gap-2 py-2">
                <input
                    {...register('saveAddress')}
                    type="checkbox"
                    id="saveAddress"
                    className="w-4 h-4 accent-selis-gold cursor-pointer"
                />
                <label htmlFor="saveAddress" className="text-[13px] text-muted-foreground cursor-pointer">Bu adresi sonraki siparişlerim için kaydet.</label>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-foreground text-background text-[13px] font-bold uppercase tracking-[0.1em] rounded-[4px] hover:opacity-90 transition-all transform active:scale-[0.98] mt-4"
            >
                DEVAM ET →
            </button>
        </form>
    );
}
