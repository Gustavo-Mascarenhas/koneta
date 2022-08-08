package com.konoPlace.konoplace.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Data
public class ReservaRegisterDTO {

    String idMesa;
    String idUser;
    Date date;
}
