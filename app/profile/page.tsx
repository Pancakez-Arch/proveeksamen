'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface RentalRequest {
  _id: string;
  equipmentId: {
    name: string;
    image: string;
  };
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'denied';
  totalPrice: number;
}

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [rentalHistory, setRentalHistory] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileRes, rentalsRes] = await Promise.all([
          fetch('/api/user/profile'),
          fetch('/api/user/rentals')
        ]);

        const profileData = await profileRes.json();
        const rentalsData = await rentalsRes.json();

        setProfile(profileData.user);
        setRentalHistory(rentalsData.rentals);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProfileData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Profil
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Navn
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">{profile?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-post
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">{profile?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rolle
              </label>
              <p className="mt-1 text-gray-900 dark:text-white capitalize">{profile?.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Leiehistorikk
          </h2>
          <div className="space-y-6">
            {rentalHistory.map((rental) => (
              <div
                key={rental._id}
                className="border dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {rental.equipmentId.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Fra: {new Date(rental.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Til: {new Date(rental.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Total pris: {rental.totalPrice} kr
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Status:{' '}
                      <span
                        className={`font-semibold ${
                          rental.status === 'approved'
                            ? 'text-green-600'
                            : rental.status === 'denied'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {rental.status === 'approved'
                          ? 'Godkjent'
                          : rental.status === 'denied'
                          ? 'Avslått'
                          : 'Venter'}
                      </span>
                    </p>
                  </div>
                  <img
                    src={rental.equipmentId.image}
                    alt={rental.equipmentId.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 