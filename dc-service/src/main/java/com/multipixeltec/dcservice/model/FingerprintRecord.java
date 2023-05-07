package com.multipixeltec.dcservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Table(name = "FINGERPRINT_RECORD")
public class FingerprintRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "IMG_PATH")
    private String imagePath;

    @Column(name = "FINGERPRINT_STRING",length = 2048)
    private String blob;

    @Column(name = "USER_ID")
    private Long userId;
}
