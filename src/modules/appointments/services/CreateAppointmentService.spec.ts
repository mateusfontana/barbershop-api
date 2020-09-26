import AppError from '@shared/errors/AppError';
import AppointmentsRepositoryMock from '../repositories/mocks/AppointmentsRepositoryMock';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentsRepositoryMock = new AppointmentsRepositoryMock();
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepositoryMock,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      providerId: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123123');
  });

  it('should not be able to create two appointments on the same date and time', async () => {
    const appointmentsRepositoryMock = new AppointmentsRepositoryMock();
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepositoryMock,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: '123123123',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
